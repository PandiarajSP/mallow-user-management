import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

const initialState: UserState = {
  email: null,
  firstName: null,
  lastName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;

      // Extract names from email format "aaaa.bbbb@domain"
      const [beforeAt] = action.payload.split("@");
      const [first, last] = beforeAt.split(".");

      state.firstName = first ?? null;
      state.lastName = last ?? null;
    },

    clearUser(state) {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
    },
  },
});

export const { setUserEmail, clearUser } = userSlice.actions;
export default userSlice.reducer;
