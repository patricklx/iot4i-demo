import Component from '@ember/component';

export default class extends Component {
  init() {
    super.init(...arguments);
  }

  drawChart() {
    const users = this.users || [];
    const chartData = [];
    for (let i = 12; i >= 0; i--) {
      const date = new Date();
      const result = users.filter(user => user.createdAt <= new Date(date.getFullYear(), date.getMonth() + 1 - i));
      chartData.push({
        date: new Date(new Date().getFullYear(), date.getMonth() - i),
        value: result.length
      });
    }

    const chartdiv = this.$().find('.chartdiv')[0];
    this.chart = AmCharts.makeChart(chartdiv, {
      type: 'serial',
      theme: 'blur',
      marginTop: 15,
      marginRight: 15,
      dataProvider: chartData,
      categoryField: 'date',
      categoryAxis: {
        parseDates: true,
        gridAlpha: 0
        // color: layoutColors.defaultText,
        // axisColor: layoutColors.defaultText
      },
      valueAxes: [
        {
          minVerticalGap: 50,
          gridAlpha: 0,
          // color: layoutColors.defaultText,
          // axisColor: layoutColors.defaultText,
          title: 'Users'
        }
      ],
      graphs: [
        {
          id: 'g1',
          bullet: 'none',
          useLineColorForBulletBorder: true,
          // lineColor: baUtil.hexToRGB(graphColor, 0.5),
          lineThickness: 1,
          // negativeLineColor: layoutColors.danger,
          type: 'smoothedLine',
          valueField: 'value',
          fillAlphas: 1,
          fillColorsField: 'lineColor'
        }
      ],
      chartCursor: {
        categoryBalloonDateFormat: 'MM YYYY',
        categoryBalloonColor: '#4285F4',
        categoryBalloonAlpha: 0.7,
        cursorAlpha: 0,
        valueLineEnabled: true,
        valueLineBalloonEnabled: true,
        valueLineAlpha: 0.5
      },
      dataDateFormat: 'MM YYYY',
      export: {
        enabled: true
      },
      creditsPosition: 'bottom-right',
      zoomOutButton: {
        backgroundColor: '#fff',
        backgroundAlpha: 0
      },
      zoomOutText: ''
      // pathToImages: layoutPaths.images.amChart
    });

    this.chart.addListener('rendered', this.zoomChart.bind(this));
    this.zoomChart();
    if (this.chart.zoomChart) {
      this.chart.zoomChart();
    }
  }

  zoomChart() {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 12);
    this.chart.zoomToDates(startDate, new Date());
  }

  didRender() {
    this.drawChart();
  }
}
