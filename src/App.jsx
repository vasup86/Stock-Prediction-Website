import { useEffect } from 'react';
import Graph from './components/Graph';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import Home from './components/Home';
import { useDispatch } from 'react-redux';
import { getStockOptions } from './store/home.store';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.HomeStore.isLoading);
  const response = useSelector((state) => state.HomeStore.response);

  // Run the api to get stock tickers once on app init.
  useEffect(() => {
    // dispatch(getStockOptions());
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
