import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAllComments = createAsyncThunk(
	'comment/fetchAllComments',
	async () => {
		const { data } = await axios.get('/comment')
		return data
	}
)

export const fetchLastComment = createAsyncThunk(
	'comment/fetchLastComment',
	async () => {
		const { data } = await axios.get('/comment/last')
		return data
	}
)

const initialState = {
	data: null,
	status: 'loading',
}

const commentSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchAllComments.pending]: state => {
			state.data = null
			state.status = 'loading'
		},
		[fetchAllComments.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'loaded'
		},
		[fetchAllComments.rejected]: state => {
			state.data = null
			state.status = 'error'
		},
		[fetchLastComment.pending]: state => {
			state.data = null
			state.status = 'loading'
		},
		[fetchLastComment.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'loaded'
		},
		[fetchLastComment.rejected]: state => {
			state.data = null
			state.status = 'error'
		},
	},
})

export const isData = state => Boolean(state.comments.data)
export const commentReducer = commentSlice.reducer
