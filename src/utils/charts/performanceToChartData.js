import moment from 'moment';
import { colors } from './init';

export default function performanceToChartData(performances) {
  const labels = performances
    .map((p) => moment(p.calculated_at).format('DD-MM-YYYY'))
    .reverse();
  const data = performances
    .map(
      (p) =>
        Math.round(p.ownerships.reduce((acc, o) => o.amount + acc, 0) * 100) /
        100,
    )
    .reverse();
  return function (canvas) {
    return {
      labels,
      datasets: [
        {
          label: 'Net Asset Value',
          data,
        },
      ],
    };
  };
}

export const options = {
  scales: {
    yAxes: [
      {
        gridLines: {
          color: colors.gray[900],
          zeroLineColor: colors.gray[900],
        },
        ticks: {
          callback: function (value) {
            if (!(value % 10)) {
              return '$' + value + 'k';
            }
          },
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      label: function (item, data) {
        var label = data.datasets[item.datasetIndex].label || '';
        var yLabel = item.yLabel;
        var content = '';

        if (data.datasets.length > 1) {
          content += label;
        }

        content += '$' + yLabel + 'k';
        return content;
      },
    },
  },
};
