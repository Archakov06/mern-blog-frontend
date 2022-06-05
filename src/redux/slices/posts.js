import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/posts/tags');
  return data;
});

const initialState = {
  posts: [],
  tags: [],
  postStatus: 'loading',
  tagStatus: 'loading',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePost: (state, action) => {
      state.posts = state.posts.filter((obj) => obj._id !== action.payload);
    },
  },
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.postStatus = 'loaded';
    },
    [fetchPosts.pending]: (state, action) => {
      state.posts = [];
      state.postStatus = 'loading';
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts = [];
      state.postStatus = 'error';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags = action.payload;
      state.tagStatus = 'loaded';
    },
    [fetchTags.pending]: (state, action) => {
      state.tags = [];
      state.tagStatus = 'loading';
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags = [];
      state.tagStatus = 'error';
    },
  },
});

export const postsReducer = postsSlice.reducer;
export const { removePost } = postsSlice.actions;
