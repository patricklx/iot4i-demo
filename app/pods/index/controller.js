import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  chartData: Ember.computed(function () {
    let data, labels;
    data = [];
    labels = ["January", "February", "March", "April", "May", "June", "July"];

    for(let i=0; i<labels.length; i++) {
      data.push(Math.pow(3,i));
    }

    return {
      labels: labels,
      datasets: [{
        label: 'Users',
        fill: true,
        data: data
      }]
    };
  }),

  options: {
    scales: {
      xAxes: [{
        position: 'bottom'
      }]
    }
  },

  actions: {
    createUser() {

    }
  }
});
