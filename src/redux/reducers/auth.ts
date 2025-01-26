import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  isAdmin: boolean;
  _id: string;
  name: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null; // Corrected the key from msasd to user
  loader: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: null, // Initial state for user
  loader: true, // Loader is true initially
  isAdmin: false, // Assuming by default the user is not an admin
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExited: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loader = false;
      state.isAdmin = action.payload.isAdmin; // Set the admin status when user exits
    },
    userNotExited: (state) => {
      state.user = null;
      state.loader = false;
      state.isAdmin = false; // Reset the admin status when no user is logged in
    },
  },
});

export default authSlice;

export const { userExited, userNotExited } = authSlice.actions;
