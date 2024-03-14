import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";

export const fetchUserData = createAsyncThunk('auth/fetchUserData'
    , async (params) => {
        const {data} = await axios.post('/auth/login', params);
        return data;
    });

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [fetchUserData.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchUserData.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    }
});

export const authReducer = authSlice.reducer;