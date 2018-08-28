import { helper as buildHelper } from '@ember/component/helper';

export function formAttrTranslateable([attr, fieldsets]) {
  const part = attr.replace('__data.', '').split('.');
  for (let i = 0, l = fieldsets.length; i < l; i++) {
    const fs = fieldsets[i];
    if (fs.id && fs.id !== part[0]) {
      continue;
    }
    const fieldId = fs.id ? part.slice(1).join('.') : part.join('.');
    for (let j = 0, l2 = fs.fields.length; j < l2; j++) {
      const f = fs.fields[j];
      if (f.id === fieldId) {
        return f.label || f.description;
      }
    }
  }
  return '<not found>';
}

export default buildHelper(formAttrTranslateable);
