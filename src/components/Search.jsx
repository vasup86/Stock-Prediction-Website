import { useState } from 'react';
import { getForecast, saveInput, clearResponseAndInput } from '../store/home.store';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconButton,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  Autocomplete,
  TextField,
  createFilterOptions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../css/search.css';

export default function Search() {
  const [input, setInput] = useState('');

  // Used to dispatch actions to store
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.HomeStore.isLoading);
  const error = useSelector((state) => state.HomeStore.error);
  const stockOptions = useSelector((state) => state.HomeStore.stockOptions);
  // const stockOptionsError = useSelector((state) => state.HomeStore.stockOptionsError);
  const userInput = useSelector((state) => state.HomeStore.input);

  const submitRequest = (event) => {
    event.preventDefault();
    setInput('');
    if (!userInput.includes(input.toUpperCase())) {
      dispatch(saveInput(input.toUpperCase().trim()));
      dispatch(getForecast(input.toUpperCase().trim()));
    }
  };
  const filterOptions = createFilterOptions({
    ignoreCase: true,
    matchFrom: 'start',
    limit: 10,
  });

  const [open, setOpen] = useState(false);
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
          {/* ! Checkout: https://mui.com/material-ui/react-autocomplete/  free solo for optional autocomplete but still allows any input */}
          <Autocomplete
            id="autocomplete"
            open={open}
            required
            freeSolo
            filterOptions={filterOptions}
            options={stockOptions.map((option) => `${option.name} (${option.symbol})`)}
            onChange={(event, newValue) => {
              const ticker = newValue.includes('(')
                ? newValue
                    .match(/\((.*?)\)/)[0]
                    .replace('(', '')
                    .replace(')', '')
                : newValue;
              setInput(ticker);
            }}
            onInputChange={(_, value) => {
              if (value.length === 0) {
                if (open) setOpen(false);
              } else {
                if (!open) setOpen(true);
              }
            }}
            onClose={() => setOpen(false)}
            sx={{
              width: '12.5em',
              // color: 'inherit',
              input: { color: '#c7c8ca' },
              '& .MuiTextField-root': {
                margin: '0',
              },
              '& .MuiFormLabel-root': {
                color: 'inherit',
              },
              '& .MuiOutlinedInput-root ': {
                padding: '0',
              },
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                border: 'none',
                borderBottom: '1px solid #BB86FC',
              },
            }}
            renderInput={(params) => (
              <TextField {...params} label="Enter stock ticker" margin="normal" variant="outlined" />
            )}
            variant="standard"
          />

          <IconButton aria-label="Search" type="submit">
            <SearchIcon sx={{ color: '#c7c8ca' }} />
          </IconButton>
        </form>
      </div>
    </div>
  );
}
