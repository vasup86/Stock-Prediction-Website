import data from './assets/result.json';
import Graph from './components/Graph';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import Home from './components/Home';

export default function App() {
  const isLoading = useSelector((state) => state.HomeStore.isLoading);
  const response = useSelector((state) => state.HomeStore.response);

  return (
    <>
      {isLoading && <CircularProgress />}
      {/* <div className="graph">
        <Graph data={data} />
      </div> */}
      <Home />

      {response && typeof response.result !== 'string' && <Graph data={response.result} />}
    </>
  );
}
