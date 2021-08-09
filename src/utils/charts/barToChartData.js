import moment from 'moment';
import { colors } from './init';

export function barToChartData(bars) {
  const labels = bars.map((b) => moment(b.timestamp).format('DD-MM-YYYY'));
  const data = bars.map((b) => Math.round(b.price * 100) / 100);
  return function (canvas) {
    return {
      labels,
      datasets: [
        {
          label: 'Stock Price',
          data,
        },
      ],
    };
  };
}

export const barToOptions = (bars) => ({
  scales: {
    yAxes: [
      {
        gridLines: {
          color: colors.gray[900],
          zeroLineColor: colors.gray[900],
        },
        ticks: {
          callback: function (value) {
            return '$' + value;
          },
          min: Math.min(...bars.map((b) => Math.floor(b.price))),
          max: Math.max(...bars.map((b) => Math.ceil(b.price))),
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      label: function (item, data) {
        const label = data.datasets[item.datasetIndex].label || '';
        const yLabel = item.yLabel;
        let content = '';

        if (data.datasets.length > 1) {
          content += `${label} `;
        }

        content += '$' + yLabel;
        return content;
      },
      labelColor: function (item, data) {
        if (
          !data.tooltip._data ||
          !data.tooltip._data.datasets ||
          !data.tooltip._data.datasets[item.datasetIndex] ||
          !data.tooltip._data.datasets[item.datasetIndex].borderColor
        ) {
          return {
            borderColor: colors.theme.primary,
            backgroundColor: colors.theme.primary,
          };
        }
        return {
          borderColor:
            data.tooltip._data.datasets[item.datasetIndex].borderColor,
          backgroundColor:
            data.tooltip._data.datasets[item.datasetIndex].borderColor,
        };
      },
    },
  },
});
