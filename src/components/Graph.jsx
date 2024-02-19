import { Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from 'react-redux';
import { clearResponseAndInput } from '../store/home.store';
import { Button } from '@mui/material';
import '../css/graph.css';
import Search from './Search';

export default function Graph({ data }) {
  const userInput = useSelector((state) => state.HomeStore.input);
  const dispatch = useDispatch();

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const oldestStock = () => {
    let largestIndex = 0;
    let largestLength = 0;

    // find the index with most elem
    data.forEach((elem, index) => {
      if (elem.length > largestLength) {
        largestIndex = index;
        largestLength = elem.length;
      }
    });

    // For stock with less than 6 months of data, add empty objs to push the graph up, so it lineup
    data = data.map((stock) => {
      if (stock.length < largestLength) {
        const diff = largestLength - stock.length;
        const tempArr = [];
        for (let i = 0; i < diff; i++) {
          tempArr.push({
            past: null,
            forecast: null,
          });
        }
        return tempArr.concat(stock);
      }
      return stock;
    });

    return largestIndex;
  };

  const cleanData = () => ({
    labels: data[oldestStock()]
      .map(
        (item) =>
          `${new Date(item.date).getMonth() + 1}/${new Date(item.date).getDate()}/${new Date(item.date).getFullYear()}`
      )
      .flat(Infinity),
    datasets: data
      .map((stock, index) => {
        const color = getRandomColor();
        return [
          {
            label: `${userInput[index].toUpperCase()} Last 6 Months`,
            data: stock.map((item) => item.past),
            borderColor: color,
            //'#58b95e',
            // backgroundColor: '#74ce79',
            // fill: true,
            pointStyle: false,
          },
          {
            label: `${userInput[index].toUpperCase()} 1 Month Forecast`,
            data: stock.map((item) => item.forecast),
            // borderColor: "blue",
            pointStyle: false,
            // borderDash:[2,1],

            borderColor: color,
            //'#77d77c',
            // backgroundColor: '#80f286',
            // fill: true,
          },
        ];
      })
      .flat(Infinity),
  });

  return (
    <div className="graph-main">
      <div className="graph-container">
        <Search searchWidth="15em" />
        <div className="graph">
          <Line
            data={cleanData()}
            options={{
              scales: {
                x: {
                  ticks: {
                    color: '#c7c8ca',
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  ticks: {
                    color: '#c7c8ca',
                  },
                  grid: {
                    color: 'black',
                  },
                },
              },
            }}
          />
        </div>
        <div className="button">
          <Button
            variant="contained"
            onClick={() => {
              dispatch(clearResponseAndInput());
            }}
            size="large"
            style={{
              backgroundColor: '#bb86fc',
            }}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
