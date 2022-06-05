import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserInfo = createAsyncThunk('auth/fetchUserInfo', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    resetUserData: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchUserInfo.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUserInfo.rejected]: (state) => {
      state.status = 'error';
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUserData, resetUserData } = authSlice.actions;
