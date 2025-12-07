// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./errorSlice";
import userReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    globalError: errorReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
