import { useEffect } from 'react';
import Graph from './components/Graph';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import Home from './components/Home';

export default function App() {
  const isLoading = useSelector((state) => state.HomeStore.isLoading);
  const response = useSelector((state) => state.HomeStore.response);

  // Run the api to get stock tickers once on app init.
  useEffect(() => {
    const endpoint = 'https://financialmodelingprep.com/api/v3/stock/list';
    const apikey = import.meta.env.VITE_FMP_API_KEY;

    const request = `${endpoint}?apikey=${apikey}`;

    console.log(request);

    // fetch(request)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }, []);

  return (
    <>
      {isLoading && <CircularProgress />}
      {/* <div className="graph">
        <Graph data={data} />
      </div> */}
      {response.length === 0 && <Home />}

      {response.length > 0 && <Graph data={response} />}
    </>
  );
}
