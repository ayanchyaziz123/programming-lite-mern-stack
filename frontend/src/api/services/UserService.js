import http from "../http-common2";
import httpUserCreate from '../http-user-create';
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



const UserService = {
    sign_in,
    sign_up,
    SignUp_verification,
    logout
};
export default UserService;