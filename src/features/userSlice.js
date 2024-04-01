import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersDB from "../firebase/firestoreDB";

// User
export const createUserDB = createAsyncThunk(
  "user/createUserDB",
  async (email) => {
    return await usersDB.create(email);
  }
);
export const updateUserDB = createAsyncThunk(
  "user/updateUserDB",
  async ({ email, newEmail }, { getState }) => {
    const state = getState();
    await usersDB.copy(newEmail, state.user.predictions);
    await usersDB.delete(email);
  }
);
export const deleteUserDB = createAsyncThunk(
  "user/deleteUserDB",
  async (email) => {
    return await usersDB.delete(email);
  }
);

export const getUserDataDB = createAsyncThunk(
  "user/getUserDataDB",
  async (email) => {
    const result = await usersDB.initialize(email);
    return result.data();
  }
);

// Predictions
export const addPredictionsDB = createAsyncThunk(
  "user/addPredictionsDB",
  async ({ media, email }) => {
    await usersDB.insertPredictions(email, media);
    return media;
  }
);

export const removePredictionsDB = createAsyncThunk(
  "user/removePredictionsDB",
  async ({ prediction, email }) => {
    await usersDB.removePredictions(email, prediction);
    return prediction;
  }
);

export const clearPredictionsDB = createAsyncThunk(
  "user/clearPredictionsDB",
  async ({ prediction, email }) => {
    await usersDB.clearPredictions(email);
    return prediction;
  }
);

const initialState = {
  user: null,
  predictions: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUserDataDB.fulfilled, (state, action) => {
      state.predictions = action.payload?.predictions
        ? action.payload.predictions.reverse()
        : [];
    });
    // Predictions
    builder.addCase(addPredictionsDB.fulfilled, (state, action) => {
      state.predictions.unshift(action.payload);
    });
    builder.addCase(removePredictionsDB.fulfilled, (state, action) => {
      state.predictions = state.predictions.filter(
        (prediction) =>
          prediction.timestamp[0] + prediction.timestamp[1] !==
          action.payload.timestamp[0] + action.payload.timestamp[1]
      );
    });
    builder.addCase(clearPredictionsDB.fulfilled, (state) => {
      state.predictions = [];
    });
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectPredictions = (state) => state.user.predictions;

export default userSlice.reducer;
