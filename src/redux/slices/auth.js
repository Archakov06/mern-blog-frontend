import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios';

// WRITING THE INITIAL STATE:
const initialState = {
    data: null,
    status: 'loading'
}

export const getUserData = createAsyncThunk('auth/getUserData',
    async (params) => {
        // ! in params we store login and pass;
        const { data } = await axios.post('/auth/login', params);
        return data;
    }
);


const authSlice = createSlice(
    {
        name:'auth',
        initialState,
        extraReducers: {
            [getUserData.pending]: (state) => {
                state.status = 'loading';
                state.data = null;
            },
            [getUserData.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.posts.status = action.payload;
            },
            [getUserData.rejected]: (state) => {
                state.status = 'error';
                state.data = null;
            },
        }
    }
);

export const authReducer = authSlice.reducer;
