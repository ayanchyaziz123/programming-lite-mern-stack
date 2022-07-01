import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './slices/blogs';
import userReducer from './slices/users';
// import authReducer from "./slices/auth";
const reducer = {
    tutorials: blogReducer,
    users: userReducer
}
const store = configureStore({
    reducer: reducer,
    devTools: true,
})
export default store;