import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  title: string;
  message: string;
}

interface GlobalErrorSlice {
  error: ErrorState | null;
}

const initialState: GlobalErrorSlice = {
  error: null,
};

const errorSlice = createSlice({
  name: "globalError",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<ErrorState | null>) {
      state.error = action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
