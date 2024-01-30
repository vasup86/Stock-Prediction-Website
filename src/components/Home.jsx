import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getForecast, saveInput } from '../store/home.store';

export default function Home() {
  const [input, setInput] = useState('');

  // Used to dispatch actions to store
  const dispatch = useDispatch();

  const submitRequest = (event) => {
    event.preventDefault();
    setInput('');
    dispatch(saveInput(input));
    dispatch(getForecast(input));
  };

  return (
    <div>
      <form onSubmit={submitRequest}>
        <input type="text" value={input} required pattern="[A-Za-z.]+" onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
