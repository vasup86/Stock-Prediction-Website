import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForecast } from '../store/home.store';

export default function Home() {
  const [input, setInput] = useState('');

  // Used to dispatch actions to store
  const dispatch = useDispatch();

  const submitRequest = (event) => {
    event.preventDefault();
    setInput('');
    dispatch(getForecast(input));
  };

  useEffect(() => {
    // Move this to an env variables file
    const apikey = 'Check website: https://site.financialmodelingprep.com/developer/docs/dashboard';
    const endpoint = 'https://financialmodelingprep.com/api/v3/stock/list';

    const request = `${endpoint}?apikey=${apikey}`;

    // fetch(request)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <input
        type="text"
        value={input}
        required="required"
        pattern="[A-Za-z0-9]{1,20}"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={submitRequest}>Click</button>
    </div>
  );
}
