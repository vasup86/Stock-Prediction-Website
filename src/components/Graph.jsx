import { Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';

export default function Graph({ data }) {
  const cleanData = () => ({
    labels: data.map(
      (item) =>
        `${new Date(item.date).getMonth() + 1}/${new Date(item.date).getDate()}/${new Date(item.date).getFullYear()}`
    ),
    datasets: [
      {
        label: 'Last 6 Months',
        data: data.map((item) => item.past),
        borderColor: '#58b95e',
        backgroundColor: '#74ce79',
        fill: true,
        pointStyle: false,
      },
      {
        label: '1 Month Forecast',
        data: data.map((item) => item.forecast),
        // borderColor: "blue",
        pointStyle: false,
        // borderDash:[2,1],

        borderColor: '#77d77c',
        backgroundColor: '#80f286',
        fill: true,
      },
    ],
  });

  return (
    <div>
      <Line
        data={cleanData()}
        // options= {{
        //     scales: {
        //         x: {
        //             type: 'timeseries',
        //         }
        //     }
        // }}
      />
    </div>
  );
}
