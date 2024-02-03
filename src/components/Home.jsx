import { useState } from 'react';
import { Input } from '@mui/material';
import { getForecast, saveInput } from '../store/home.store';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Search from './Search';
import '../css/home.css';

export default function Home() {
  const [input, setInput] = useState('');

  // Used to dispatch actions to store
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.HomeStore.isLoading);
  // const stockOptions = useSelector((state) => state.HomeStore.stockOptions);
  const stockOptionsError = useSelector((state) => state.HomeStore.stockOptionsError);

  // const defaultProps = {
  //   options: stockOptions,
  //   getOptionLabel: (option) => option.title,
  // };
  // const flatProps = {
  //   options: stockOptions.map((option) => option.title),
  // };

  return (
    <div className="home-main">
      <div className="title">Stock Predictor</div>

      <Search />
    </div>
  );
}
