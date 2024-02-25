import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersDB from '../firebase/firestoreDB';

// User
export const createUserDB = createAsyncThunk(
  'user/createUserDB',
  async (email) => {
    return await usersDB.create(email);
  });
export const updateUserDB = createAsyncThunk(
  'user/updateUserDB',
  async ({ email, newEmail }, { getState }) => {
    const state = getState();
    await usersDB.copy(newEmail, state.user.mylist, state.user.history);
    await usersDB.delete(email);
  });
export const deleteUserDB = createAsyncThunk(
  'user/deleteUserDB',
  async (email) => {
    return await usersDB.delete(email);
  });

export const getUserDataDB = createAsyncThunk(
  'user/getUserDataDB',
  async (email) => {
    const result = await usersDB.initialize(email);
    return result.data();
  });

const initialState = {
  user: null,
  mylist: [],
  history: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserDataDB.fulfilled, (state, action) => {
        state.mylist = action.payload?.mylist || [];
        state.history = action.payload?.history ? action.payload.history.reverse() : [];
      });
  }
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
