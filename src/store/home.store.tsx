import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface HomeState {
  isLoading: boolean;
  error: any;
  response: any;
}

const initialState = {
  isLoading: false,
  error: false,
  response: undefined,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getForecast.pending, (state, action) => {
      state.isLoading = true;
    });
    // No response, action.payload will be the reponse.json()
    builder.addCase(getForecast.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
    });
    builder.addCase(getForecast.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;

      // ISSUE with flask error with payload and normal http response errors

      // state.error = JSON.parse(action?.error?.message || '{"error": "error"}');
    });
  },
});

// Async actions to fetch prediction from api
// Docs: https://www.youtube.com/watch?v=2JBx_06dD1k&t=817s
export const getForecast = createAsyncThunk('getForecast', async (ticker) => {
  return await fetch('/predict', {
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

export default homeSlice.reducer;
