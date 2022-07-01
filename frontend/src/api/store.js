import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './slices/blogs';
import userReducer from './slices/users';
import categoryReducer from './slices/categories';
// import authReducer from "./slices/auth";
const reducer = {
    blogs: blogReducer,
    users: userReducer,
    category: categoryReducer
}
const store = configureStore({
    reducer: reducer,
    devTools: true,
})
export default store;