import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:4000/api/vv3",
    headers: {
        "Content-type": "multipart/form-data"
    }
});