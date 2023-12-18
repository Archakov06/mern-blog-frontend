import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios';

export const getAuthData = createAsyncThunk('auth/getUserData',
    async (params) => {
        // ! in params we store login and pass;
        const { data } = await axios.post('/auth/login', params);
        return data;
    });

export const getAuthMe = createAsyncThunk('auth/getAuthMe',
    // A server request to confirm that we are actually logged in:
    async () => {
        const { data } = await axios.get('/auth/me');
        return data;
    });

// WRITING THE INITIAL STATE:
const initialState = {
    data: null,
    status: 'loading'
    // FIXME[MEDIUM]
    //  isAauth - we might wanna add this var as a variable in state.
    // its some bullshit to have this locally here;
}

const authSlice = createSlice(
    {
        name:'auth',
        initialState,

        reducers: {
            logout: (state) => {
                // LOG-out is done by "nullifiing login data"
                state.data = null;
            }
        },

        extraReducers: {
            [getAuthData.pending]: (state) => {
                state.status = 'loading';
                state.data = null;
            },
            [getAuthData.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            },
            [getAuthData.rejected]: (state) => {
                state.status = 'error';
                state.data = null;
            },

            [getAuthMe.pending]: (state) => {
                state.status = 'loading';
                state.data = null;
            },
            [getAuthMe.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            },
            [getAuthMe.rejected]: (state) => {
                state.status = 'error';
                state.data = null;
            },
        }
    }
);

export const selectIsAuth = state => Boolean(state.auth.data);
// we write this func to check if we are Authorized or not;
// Boolean() returns true if provided param RECEIVES any data. Else, stays false;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
