import axios from "axios";

const user = localStorage.getItem('user_info') ?
        JSON.parse(localStorage.getItem('user_info')) : null

export default axios.create({
    baseURL: "http://localhost:4000/api/blog",
    headers: {
        "Content-type": "application/json",
        Authorization : user ? `Bearer ${user.access_token}` : null
    }
});