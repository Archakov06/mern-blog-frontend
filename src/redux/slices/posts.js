import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/posts')
	return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
	const { data } = await axios.get('/tags')
	return data
})

export const fetchRemovePost = createAsyncThunk(
	'posts/fetchRemovePost',
	async id => {
		const { data } = await axios.delete(`/posts/${id}`)
		return data
	}
)

export const fetchPostsByPopularity = createAsyncThunk(
	'posts/fetchPostsByPopularity',
	async () => {
		const { data } = await axios.get('/posts/popular')
		return data
	}
)

export const fetchPostsByTags = createAsyncThunk(
	'/tags/fetchPostsByTags',
	async id => {
		const { data } = await axios.get(`/posts/tags/${id}`)
		return data
	}
)

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
	tags: {
		items: [],
		status: 'loading',
	},
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchPosts.pending]: state => {
			state.posts.items = []
			state.posts.status = 'loading'
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'loaded'
		},
		[fetchPosts.rejected]: state => {
			state.posts.items = []
			state.posts.status = 'error'
		},
		[fetchTags.pending]: state => {
			state.tags.items = []
			state.tags.status = 'loading'
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload
			state.tags.status = 'loaded'
		},
		[fetchTags.rejected]: state => {
			state.tags.items = []
			state.tags.status = 'error'
		},
		[fetchRemovePost.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter(
				obj => obj._id !== action.meta.arg
			)
		},
		[fetchPostsByPopularity.pending]: state => {
			state.posts.items = []
			state.posts.status = 'loading'
		},
		[fetchPostsByPopularity.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'loaded'
		},
		[fetchPostsByPopularity.rejected]: state => {
			state.posts.items = []
			state.posts.status = 'error'
		},
		[fetchPostsByTags.pending]: state => {
			state.posts.items = []
			state.posts.status = 'loading'
		},
		[fetchPostsByTags.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'loaded'
		},
		[fetchPostsByTags.rejected]: state => {
			state.posts.items = []
			state.posts.status = 'error'
		},
	},
})

export const postsReducer = postsSlice.reducer
