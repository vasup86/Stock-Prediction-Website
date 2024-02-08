import { useEffect } from 'react';
import Graph from './components/Graph';
import { useSelector, useDispatch } from 'react-redux';

import Home from './components/Home';
import { getStockOptions } from './store/home.store';

import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.HomeStore.response);

  // Run the api to get stock tickers once on app init.
  useEffect(() => {
    dispatch(getStockOptions());
  }, []);

  return (
    <>
      {response.length === 0 && <Home />}
      {response.length > 0 && <Graph data={response} />}
    </>
  );
}
