/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { colors, parseOptions } from '../utils/charts/init';

// Example 1 of Chart inside src/views/Index.js (Sales value - Card)
export const chartExample1 = {
  options: {
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
  },
  data1: (canvas) => {
    return {
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Performance',
          data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
        },
      ],
    };
  },
  data2: (canvas) => {
    return {
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Performance',
          data: [0, 20, 5, 25, 10, 30, 15, 40, 40],
        },
      ],
    };
  },
};

// Example 2 of Chart inside src/views/Index.js (Total orders - Card)
let chartExample2 = {
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (value) {
              if (!(value % 10)) {
                //return '$' + value + 'k'
                return value;
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
          content += yLabel;
          return content;
        },
      },
    },
  },
  data: {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [25, 20, 30, 22, 17, 29],
        maxBarThickness: 10,
      },
    ],
  },
};

export const chartExample3 = {
  options: {
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
                return '$' + value;
              }
            },
            min: 550,
            max: 650,
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

          content += '$' + yLabel;
          return content;
        },
      },
    },
  },
  daily: (canvas) => {
    return {
      labels: [
        '2021-05-13',
        '2021-05-14',
        '2021-05-17',
        '2021-05-18',
        '2021-05-19',
        '2021-05-20',
        '2021-05-21',
        '2021-05-24',
        '2021-05-25',
        '2021-05-26',
        '2021-05-27',
        '2021-05-28',
        '2021-06-01',
        '2021-06-02',
        '2021-06-03',
        '2021-06-04',
        '2021-06-07',
        '2021-06-08',
        '2021-06-09',
        '2021-06-10',
        '2021-06-11',
      ],
      datasets: [
        {
          label: 'Performance',
          data: [
            571.4, 589.72, 576.83, 577.87, 563.46, 586.78, 580.88, 606.44,
            604.69, 619.14, 630.85, 625.22, 623.9, 605.12, 572.84, 599.05,
            605.13, 603.59, 598.78, 610.12, 609.89,
          ],
        },
      ],
    };
  },
  hourly: (canvas) => {
    return {
      labels: [
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
      ],
      datasets: [
        {
          label: 'Performance',
          data: [
            605.58, 610.6142, 611.115, 608.2391, 609.89, 610.01, 609.0001,
            609.36, 610.5,
          ],
        },
      ],
    };
  },
};

export default {
  parseOptions, // used inside src/views/Index.js
  chartExample2, // used inside src/views/Index.js
};
