import { useState } from 'react';
import { Input } from '@mui/material';
import { getForecast, saveInput, clearResponseAndInput } from '../store/home.store';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../css/search.css';

export default function Search() {
  const [input, setInput] = useState('');

  // Used to dispatch actions to store
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.HomeStore.isLoading);
  const error = useSelector((state) => state.HomeStore.error);
  // const stockOptions = useSelector((state) => state.HomeStore.stockOptions);
  // const stockOptionsError = useSelector((state) => state.HomeStore.stockOptionsError);
  const userInput = useSelector((state) => state.HomeStore.input);

  const submitRequest = (event) => {
    event.preventDefault();
    setInput('');
    if (!userInput.includes(input.toUpperCase())) {
      dispatch(saveInput(input.toUpperCase()));
      dispatch(getForecast(input.toUpperCase()));
    }
  };

  return (
    <div className="search-main">
      <div className="search-container">
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={error}
          autoHideDuration={3000}
          onClose={() => {
            dispatch(clearResponseAndInput());
          }}
        >
          <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
            Invalid Input
          </Alert>
        </Snackbar>
        <form onSubmit={submitRequest}>
          {/* ! Checkout: https://mui.com/material-ui/react-autocomplete/ for optional autocomplete but still allows any input */}
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
      </div>
    </div>
  );
}
