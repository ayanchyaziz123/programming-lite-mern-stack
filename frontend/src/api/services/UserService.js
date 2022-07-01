import http from "../http-common2";
const sign_in = (user) => {
    return http.post(`/signIn`, user);
};
const SignUp_verification = ({id, token}) =>{
    return http.get('/signUp_verification');
}
const sign_up = (user) => {
    return http.post("/signUp", user);
};
const log_out = (id) =>{
    return http.get(`/logOut/${id}`);
}



const UserService = {
    sign_in,
    sign_up,
    SignUp_verification
};
export default UserService;