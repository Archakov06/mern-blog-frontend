import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from './slices/posts'
import { authReducer } from './slices/auth'
import { commentReducer } from './slices/comment'

const store = configureStore({
	reducer: { posts: postsReducer, comments: commentReducer, auth: authReducer },
})

export default store
