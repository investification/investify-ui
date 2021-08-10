import moment from 'moment';
import { colors } from './init';

export default function performanceToChartData(performances) {
  const labels = performances
    .map((p) => moment(p.calculated_at).format('DD-MM-YYYY'))
    .reverse();
  const data = performances
    .map(
      (p) =>
        Math.round(
          (p.ownerships.reduce((acc, o) => o.amount + acc, 0) +
            p.waiting_buy_orders.reduce((acc, o) => acc + o.amount, 0)) *
            100,
        ) / 100,
    )
    .reverse();
  const depositData = performances.map((p) => p.total_deposit).reverse();
  return function (canvas) {
    return {
      labels,
      datasets: [
        {
          label: 'Net Asset Value',
          data,
        },
        {
          label: 'Total Deposit',
          data: depositData,
          borderColor: colors.theme.warning,
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
            return '$' + value;
          },
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
};
