import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./errorSlice";
export const store = configureStore({
  reducer: {
    globalError: errorReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
