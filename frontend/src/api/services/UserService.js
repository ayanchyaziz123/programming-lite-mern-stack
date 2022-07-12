import http from "../http-common2";
import httpUserCreate from '../http-user-create';
import http5 from "../slices/http-5";
const sign_in = (user) => {
    return http.post(`/signIn`, user);
};
const SignUp_verification = ({id, token}) =>{
    return http.get('/signUp_verification');
}
const sign_up = (user) => {
    return httpUserCreate.post("/signUp", user);
};

const logout = () => {
    localStorage.removeItem("user_info");
};

const get_users = () =>{
    return http.get();
}

const findById = (id) =>{
    return http.get(`/userDetails/${id}`);
}

const userProfile = (id) =>{
    return http.post('/userProfile', id);
}

const getUpdateUser = (user) =>{
    http5.post(`/updateUser`, user)
}


const update_user = (data) =>{
    httpUserCreate.post('/updateUser', data)
}

const UserService = {
    sign_in,
    sign_up,
    SignUp_verification,
    logout,
    get_users,
    findById,
    update_user,
    userProfile,
    getUpdateUser
};
export default UserService;