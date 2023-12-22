import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios';
import instance from "../../axios";

// WRITING THE INITIAL STATE:
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
            const {data} = await axios.get('/posts');
            return data;
        }
        catch (error) {
            console.log(error)
        }
    }
);

export const getTags = createAsyncThunk("posts/getTags", async () => {
        const { data } = await axios.get('/tags');
        return data;
});

export const requestRemovePost = createAsyncThunk('posts/requestRemovePost',
    async (id) => {
        await instance.delete(`/posts/${id}`);
    }
);

const postsSlice = createSlice(
    {
        name: "posts",
        initialState,
        reducers: {},

        extraReducers: {

            // Getting posts:
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
            },

            // Getting tags:
            [getTags.pending]: (state) => {
                state.tags.items = []
                state.tags.status = 'loading';
            },
            [getTags.fulfilled]: (state, action) => {
                state.tags.items = action.payload;
                state.tags.status = 'loaded';
            },
            [getTags.rejected]: (state) => {
                state.tags.items = []
                state.tags.status = 'ERROR occurred when loading';
            },

            // Requesting post deletion:
            [requestRemovePost.pending]: (state, action) => {
                state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
            }
        }
    }
);

export const postsReducer = postsSlice.reducer;