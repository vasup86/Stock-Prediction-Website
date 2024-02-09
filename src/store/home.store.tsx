import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface HomeState {
  isLoading: boolean;
  error: any;
  response: Object[];
  input: string;
  stockOptions: { name: string; symbol: string }[];
  stockOptionsError: boolean;
}

const initialState = {
  isLoading: false,
  error: false,
  response: [] as Object[],
  input: [] as string[],
  stockOptions: [] as Object[],
  stockOptionsError: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    saveInput: (state, input) => {
      state.input.push(input.payload);
    },
    clearResponseAndInput: (state) => ({ ...state, error: false, response: [] as Object[], input: [] as string[] }),
  },
  extraReducers: (builder) => {
    builder.addCase(getForecast.pending, (state, action) => {
      state.isLoading = true;
    });
    // No response, action.payload will be the reponse.json()
    builder.addCase(getForecast.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response.push(action.payload.result);
    });
    builder.addCase(getForecast.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = true;
    });

    // Get Stock Options
    builder.addCase(getStockOptions.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getStockOptions.fulfilled, (state, action) => {
      state.stockOptions = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getStockOptions.rejected, (state, action) => {
      state.isLoading = false;
      state.stockOptionsError = true;
    });
  },
});

// Async actions to fetch prediction from api
// Docs: https://www.youtube.com/watch?v=2JBx_06dD1k&t=817s
export const getForecast = createAsyncThunk('getForecast', async (ticker) => {
  return await fetch('https://stock-prediction-flask.onrender.com/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ticker }),
  })
    .then((res) => {
      // handle success (200-209) and custom server error 406
      if ((res.status >= 200 && res.status <= 299) || res.status === 406) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((res) => {
      // Throw error if flask throws an error
      if (res.errorType) {
        throw new Error(res.message);
      }
      return res;
    });
});

export const getStockOptions = createAsyncThunk('getStockOptions', async () => {
  const endpoint = 'https://financialmodelingprep.com/api/v3/stock/list';
  const apikey = import.meta.env.VITE_FMP_API_KEY;

  const request = `${endpoint}?apikey=${apikey}`;

  // * Only store NASDAQ and NYSE stocks, all the options cannot be saved in the store, memory issue

  return await fetch(request)
    .then((res) => res.json())
    .then((data) =>
      data
        .filter(
          ({ exchange, type }) =>
            (exchange === 'NASDAQ Global Select' || exchange === 'New York Stock Exchange') && type === 'stock'
        )
        .map(({ name, symbol }) => ({ name, symbol }))
    );
});

export const { saveInput, clearResponseAndInput } = homeSlice.actions;

export default homeSlice.reducer;
