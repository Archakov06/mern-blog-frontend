import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios';

const initialState = {
    posts: {
        items: [],
        status: "loading"
    },
    tags: {
        items: [],
        status: "loading"
    }
}

// THUNKS:
export const getPosts = createAsyncThunk('posts/getPosts',
    async () => {
        try {
            const { data } = await axios.get('/posts');
            return data;
        }
        catch (error) { console.log(error) }
    }
);


const postsSlice = createSlice(
    {
        name: "posts",
        initialState,
        reducers: { },

        extraReducers: {
            [getPosts.pending]: (state) => {
                state.posts.items = []
                state.posts.status = 'loading';
            },

            [getPosts.fulfilled]: (state, action) => {
                state.posts.items = action.payload;
                state.posts.status = 'loaded';
            },

            [getPosts.rejected]: (state) => {
                state.posts.items = []
                state.posts.status = 'ERROR occurred when loading';
            }
        }
    }
);






export const postsReducer = postsSlice.reducer;