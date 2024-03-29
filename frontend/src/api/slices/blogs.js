import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BlogDataService from "../services/BlogService";

const initialState =  {
    blogs: [],
    blog: [],
    comments: [],
    replies: [],
    categories: [],
    cat_message: [],
    message: [],
    pages: [],
    page: 1,
    status: null,
};

export const blogCategories = createAsyncThunk(
    "blogs/categories",
    async () =>{
        const res = await BlogDataService.fetchCategories();
        return res.data;
    }
)

export const createBlog = createAsyncThunk(
    "blogs/create",
    async (blog) => {
        const res = await BlogDataService.create(blog);
        return res.data;
    }
);

//create comment
export const createComment = createAsyncThunk(
    "comment/create",
    async (data) => {
        const res = await BlogDataService.createComment(data);
        return res.data;
    }
);

export const createReply = createAsyncThunk(
    "reply/create",
    async (data) => {
        const res = await BlogDataService.createReply(data);
        return res.data;
    }
);

export const retrieveBlogs = createAsyncThunk(
    "blogss/retrieve",
    async (keyword='') => {
        const res = await BlogDataService.getAll(keyword);
        return res.data;
    }
);
export const updateBlog = createAsyncThunk(
    "blogss/update",
    async ({ id, blog }) => {
        const res = await BlogDataService.update({ id, blog});
        return res.data;
    }
);
export const deleteBlog = createAsyncThunk(
    "blogs/delete",
    async ({ id }) => {
        await BlogDataService.remove(id);
        return { id };
    }
);
export const deleteAllBlogs = createAsyncThunk(
    "blogs/deleteAll",
    async () => {
        const res = await BlogDataService.removeAll();
        return res.data;
    }
);
export const findBlogsByTitle = createAsyncThunk(
    "blogs/findByTitle",
    async ({ title }) => {
        const res = await BlogDataService.findByTitle(title);
        return res.data;
    }
);

export const findBlogById = createAsyncThunk(
    "blogs/findById",
    async ({ id }) => {
        const res = await BlogDataService.findById(id);
        return res.data;
    }
);




const BlogSlice = createSlice({
    name: "tutorial",
    initialState,
    extraReducers: {

        // create commment

        [createComment.pending]: (state, action) => {
            state.status = "loading";
            state.comments = [];
        },
        [createComment.fulfilled]: (state, action) => {
            state.status = "success";
            state.comments = action.payload.comment;
        },
        [createComment.rejected]: (state, action) => {
            state.status = "failed";
            state.message = action.error.message;   
        },
        // create reply

        [createReply.pending]: (state, action) => {
            state.status = "loading";
            state.comments = [];
        },
        [createReply.fulfilled]: (state, action) => {
            state.status = "success";
            state.comments = action.payload.comment;
        },
        [createReply.rejected]: (state, action) => {
            state.status = "failed";
            state.message = action.error.message;   
        },
        // create blog

        [createBlog.pending]: (state, action) => {
            state.status = "loading";
            state.blogs = [];
        },
        [createBlog.fulfilled]: (state, action) => {
            state.status = "success";
            state.blogs.push(action.payload.post);
        },
        [createBlog.rejected]: (state, action) => {
            state.status = "failed";
            state.message = action.error.message;
            
        },


        // for fetch datas

        [retrieveBlogs.pending]: (state, action) => {
            state.status = "loading";
        },
        [retrieveBlogs.fulfilled]: (state, action) => {
            state.status = "success";
            state.blogs = action.payload.posts;
            state.pages = action.payload.pages;
            state.page = action.payload.page;
        },
        [retrieveBlogs.rejected]: (state, action) => {
            state.status = "failed";
            state.message = action.error.message;
            
        },

        ///end








        [updateBlog.fulfilled]: (state, action) => {
            
        },






        
        [deleteBlog.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(index, 1);
        },
        [deleteAllBlogs.fulfilled]: (state, action) => {
            return [];
        },



        [findBlogsByTitle.fulfilled]: (state, action) => {
            return [...action.payload];
        },



        // for fetch data

        [findBlogById.pending]: (state, action) => {
            state.status = "loading";
            // state.blog  = [];
        },
        [findBlogById.fulfilled]: (state, action) => {
            state.status = "success";
            state.blog = action.payload.post;
            state.comments = action.payload.comment;
        },
        [findBlogById.rejected]: (state, action) => {
            state.status = "failed";
            // state.blog = [];
        },

        ///end

        // categories

        [blogCategories.pending]: (state, action) => {
            state.status = "loading";
            state.categories = [];
        },
        [blogCategories.fulfilled]: (state, action) => {
            state.status = "success";
            state.categories = action.payload.categories;
        },
        [blogCategories.rejected]: (state, action) => {
            state.status = "failed";
            state.cat_message = action.error.message;
            
        },




    },
});
const { reducer } = BlogSlice;
export default reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const getBlogs = createAsyncThunk(
//     "/blogs",
//     async (dispatch, getState) => {
//         return await fetch("http://localhost:4000/api/vv1/tutorials").then(
//             (res) => res.json()
//         );
//     }
// );

// const blogsSlice = createSlice({
//     name: "blogs",
//     initialState: {
//         blogs: [],
//         status: null,
//     },
//     extraReducers: {
//         [getBlogs.pending]: (state, action) => {
//             state.status = "loading";
//         },
//         [getBlogs.fulfilled]: (state, action) => {
//             state.status = "success";
//             state.blogs = action.payload.posts;
//         },
//         [getBlogs.rejected]: (state, action) => {
//             state.status = "failed";
//         },
//     },
// });

// export default blogsSlice.reducer;