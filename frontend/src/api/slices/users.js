import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/UserService";

const initialState = {
    message: [],
    user_info: null,
    status: null,
};



export const SignUp = createAsyncThunk(
    "users/SignUp",
    async (user, { rejectWithValue }) => {
        try {
            const res = await UserService.sign_up(user);
            console.log("res", res.data);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const Signup_verfication = createAsyncThunk(
    "users/SignUp_verification",
    async (data) => {
        const res = await UserService.SignUp_verification(data);
        return res.data;
    }
);

export const SignIn = createAsyncThunk(
    "users/SignIn",
    async (user, { rejectWithValue }) => {
        try {
            const res = await UserService.sign_in(user);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    console.log("Hello world");
    await UserService.logout();
});




const UserSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {

        [logout.fulfilled]: (state, action) => {
            state.user_info =  null;
          },

        [SignUp.pending]: (state, action) => {
            state.status = "loading";
            state.message = [];
        },
        [SignUp.fulfilled]: (state, action) => {
            state.message = action.payload.msg;
            state.status = null;
        },
        [SignUp.rejected]: (state, action) => {
            state.status = "failed";
            state.message = action.payload.error;
        },

        // user log in

        [SignIn.pending]: (state, action) => {
            state.status = "loading";
            state.message = [];
        },
        [SignIn.fulfilled]: (state, action) => {
            console.log("action1", action.payload.msg);
            state.message = action.payload.message;
            state.user_info = action.payload.user_info;
            state.status = null;
        },
        [SignIn.rejected]: (state, action) => {
            state.status = "failed";
            console.log("action2 ", action.payload.error);
            state.message = action.payload.error;
        },

        // user log out

        // [LogOut.pending]: (state, action) => {
        //     state.status = "loading";
        //     state.message = [];
        // },
        // [LogOut.fulfilled]: (state, action) => {
        //     console.log("action1", action.payload.msg);
        //     state.message = action.payload.message;
        //     state.user_info = action.payload.user_info;
        //     state.status = null;
        // },
        // [LogOut.rejected]: (state, action) => {
        //     state.status = "failed";
        //     console.log("action2 ", action.payload.error);
        //     state.message = action.payload.error;
        // },




    },
});
const { reducer } = UserSlice;
export default reducer;


