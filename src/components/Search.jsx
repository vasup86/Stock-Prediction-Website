import { useState } from 'react';
import { Input } from '@mui/material';
import { getForecast, saveInput } from '../store/home.store';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../css/search.css';

export default function Search() {
  const [input, setInput] = useState('');

  // Used to dispatch actions to store
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.HomeStore.isLoading);
  // const stockOptions = useSelector((state) => state.HomeStore.stockOptions);
  const stockOptionsError = useSelector((state) => state.HomeStore.stockOptionsError);
  const userInput = useSelector((state) => state.HomeStore.input);

  const submitRequest = (event) => {
    event.preventDefault();
    setInput('');
    if (!userInput.includes(input.toUpperCase())) {
      dispatch(saveInput(input.toUpperCase()));
      dispatch(getForecast(input.toUpperCase()));
    }
  };

  // const defaultProps = {
  //   options: stockOptions,
  //   getOptionLabel: (option) => option.title,
  // };
  // const flatProps = {
  //   options: stockOptions.map((option) => option.title),
  // };

  return (
    <div className="search-main">
      <div className="search-container">
        {!isLoading && (
          <form onSubmit={submitRequest}>
            {/* <input type="text" value={input} required onChange={(e) => setInput(e.target.value)} /> */}
            {/* <Autocomplete
              {...defaultProps}
              id="auto-complete"
              autoComplete
              includeInputInList
              renderInput={(params) => <TextField {...params} label="autoComplete" variant="standard" />}
              onChange={(e) => {
                console.log(e);
              }}
              sx={{
                input: { color: 'white' },
                ':before': { borderBottomColor: 'white' },
                // underline when selected
                ':after': { borderBottomColor: 'green' },
              }}
            /> */}
            {/* {stockOptionsError && (
              <Input
                id="standard-basic"
                label="Standard"
                variant="standard"
                placeholder="Enter stock"
                value={input}
                required
                onChange={(e) => setInput(e.target.value)}
                sx={{
                  input: { color: 'white' },
                  ':before': { borderBottomColor: 'white' },
                  // underline when selected
                  ':after': { borderBottomColor: 'green' },
                }}
              />
            )} */}
            <Input
              id="standard-basic"
              label="Standard"
              variant="standard"
              placeholder="Enter stock ticker"
              value={input}
              required
              onChange={(e) => setInput(e.target.value)}
              sx={{
                input: { color: '#c7c8ca' },
                ':before': { borderBottomColor: '#BB86FC' },
                // underline when selected
                ':after': { borderBottomColor: '#03DAC6' },
              }}
            />
            <IconButton aria-label="Search" type="submit">
              <SearchIcon sx={{ color: '#c7c8ca' }} />
            </IconButton>
          </form>
        )}
      </div>
    </div>
  );
}
