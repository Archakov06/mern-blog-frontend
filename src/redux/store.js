import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from "./slices/posts";
import {authReducer} from "./slices/auth";

const store = configureStore({
    reducer: {
        devTools: process.env.NODE_ENV !== 'production',
        posts: postsReducer,
        auth: authReducer
    }
});

export default store;