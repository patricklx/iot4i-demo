import Component from '@ember/component';
import Object from '@ember/object';
import { computed, observer } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';


export default Component.extend({
  ajax: service(),
  store: service(),

  noNewData: true,
  tmpIniData: null,
  sections: [],
  formCache: Object.create(),
  formChanged: Object.create(),
  globalOptions: {
    allowBlank() {
      return !this.get('options.presence');
    },
    allowString() {
      return this.get('_type') === 'number';
    }
  },
  fieldsets: computed.alias('sectionContent.fieldsets'),
  sectionNames: computed('sections.[]', function () {
    return this.get('sections').mapBy('name');
  }),
  currentSectionObject: computed('sections.[]', 'currentSection', function () {
    return this.get('sections').findBy('name', this.currentSection);
  }),
  sectionContent: alias('currentSectionObject.form'),

  init(...args) {
    this._super(...args);
    this.set('currentSection', this.sections.firstObject.name);
  },

  iniData: computed('model.isLoaded', 'sectionContent.id', function () {
    // this.get('session.user').belongsTo('advancedInfo').load();
    let info = this.get('model') || {};
    let saved;
    if (localStorage.getItem(this.get('sectionContent.id'))) {
      saved = JSON.parse(localStorage.getItem(this.get('sectionContent.id')));
    }
    if (!this.get('model.isLoaded')) {
      return null;
    }
    info = info.serialize ? info.serialize() : info;
    const id = this.get('sectionContent.id');
    if (this.get('tmpIniData')) {
      return this.get('tmpIniData')[id] || this.get('tmpIniData');
    }
    info = info[id] || info;
    const data = Ember.$.extend(true, {}, info, saved);
    Ember.set(data, 'session', this.get('session'));
    return {
      model: data
    };
  }),

  /**
   * read in the data of the files
   * @param data
   * @param callback
   */
  loadFiles(data, callback) {
    const fieldsets = this.get('fieldsets');
    let nFiles = 0;
    fieldsets.forEach((fieldset) => {
      fieldset.fields.forEach((field) => {
        let file;
        const vName = [fieldset.id, field.id].join('.');

        if (field.type === 'file' || field.type === 'photo') {
          file = Ember.get(data, vName);
          if (!file || typeof file === 'string') {
            return;
          }

          if (file.data) {
            return;
          }

          nFiles++;

          const reader = new FileReader();
          reader.onload = function (e) {
            Ember.set(data, vName, {
              type: file.type,
              data: e.target.result
            });
            nFiles--;
            if (nFiles === 0) {
              callback(data);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    });
    if (nFiles === 0) {
      callback(data);
    }
  },

  hasNext: computed('formSaved', 'sections.[]', 'currentSectionObject', function () {
    if (this.get('formSaved')) {
      const sections = this.get('sections');
      const current = this.get('currentSectionObject');
      const index = sections.indexOf(current);
      return index !== sections.length - 1;
    }
    return false;
  }),

  actions: {

    onSubmit(data) {
      if (!this.get(`formChanged.${this.get('currentSectionObject.name')}`)) {
        return;
      }
      this.set('loading', true);

      this.loadFiles(data, (formData) => {
        const form = this.get('currentSectionObject.form');
        const _data = {};
        _data[form] = formData;

        this.set('tmpIniData', formData);
        if (this.model.id === '__new__') {
          this.set('model', this.store.createRecord(this.model.modelType), {});
        }
        this.setProperties('model', _data);
        localStorage.removeItem(this.get('sectionContent.id'));
        this.get('model.content').save().then(() => {
          this.set('formSaved', true);
          this.set('noNewData', true);
          this.set(`formChanged.${this.get('currentSectionObject.name')}`, false);
        }).finally(() => {
          this.set('tmpIniData', null);
          this.set('loading', false);
        });
      });
    },

    onChange(data, value, attrPath) {
      if (attrPath.startsWith('.')) {
        attrPath = attrPath.slice(1);
      }
      if (this.get(attrPath) === value) {
        return;
      }
      this.set('noNewData', false);
      this.set(`formChanged.${this.get('sectionContent.name')}`, true);
      this.loadFiles(data, (formData) => {
        localStorage.setItem(this.get('sectionContent.name'), JSON.stringify(formData));
      });
    },

    showNextSection() {
      const sections = this.get('sections');
      const current = this.get('currentSectionObject');
      const index = sections.indexOf(current);
      if (index === sections.length - 1) {
        this.transitionToRoute('settings');
      }
      this.get('model').save();
      this.set('formSaved', false);
      this.set('currentSection', Ember.get(sections, `${index + 1}.name`));
    },

    showSection(section) {
      this.set('currentSection', section);
      this.set('formSaved', false);
    }
  }
});
