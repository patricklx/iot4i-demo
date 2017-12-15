
export default Ember.Component.extend({

  graphs: [{
    "id":"g1",
    "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
    "bullet": "round",
    "bulletSize": 8,
    "lineColor": "#d1655d",
    "lineThickness": 2,
    "negativeLineColor": "#637bb6",
    "type": "smoothedLine",
    "valueField": "value"
  }],

  drawChart() {
    let chartdiv = this.$().find('.chartdiv')[0];
    let chart = AmCharts.makeChart(chartdiv, {
      "type": "serial",
      "theme": "light",
      "marginTop":0,
      "marginRight": 0,
      "dataProvider": this.get('values'),
      "graphs": this.get('graphs'),
      "chartScrollbar": {
        "graph":"g1",
        "gridAlpha":0,
        "color":"#888888",
        "scrollbarHeight":55,
        "backgroundAlpha":0,
        "selectedBackgroundAlpha":0.1,
        "selectedBackgroundColor":"#888888",
        "graphFillAlpha":0,
        "autoGridCount":true,
        "selectedGraphFillAlpha":0,
        "graphLineAlpha":0.2,
        "graphLineColor":"#c2c2c2",
        "selectedGraphLineColor":"#888888",
        "selectedGraphLineAlpha":1

      },
      "chartCursor": {
        "categoryBalloonDateFormat": "YYYY",
        "cursorAlpha": 0,
        "valueLineEnabled":true,
        "valueLineBalloonEnabled":true,
        "valueLineAlpha":0.5,
        "fullWidth":true
      },
      "dataDateFormat": "YYYY",
      "categoryField": "date",
      "categoryAxis": {
        "minPeriod": "YYYY",
        "parseDates": true,
        "minorGridAlpha": 0.1,
        "minorGridEnabled": true
      },
      "export": {
        "enabled": true
      }
    });
  },

  didRender() {
    this.drawChart();
  }
})
