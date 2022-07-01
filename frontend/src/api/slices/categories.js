import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoryDataService from "../services/CategoriesService";

const initialState =  {
    categories: [],
    message: [],
    status: null,
};

export const fetchCategories = createAsyncThunk(
    "/categories",
    async (data) =>{
        const res = await CategoryDataService.fetchCategories();
        return res.data;
    }
)


const CategorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: {

        // categories
        

        [fetchCategories.pending]: (state, action) => {
            state.status = "loading";
            state.categories = [];
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.status = "success";
            state.categories = action.payload.categories;
        },
        [fetchCategories.rejected]: (state, action) => {
            state.status = "failed";
            state.message = action.error.message;
            
        },
    },
});
const { reducer } = CategorySlice;
export default reducer;


