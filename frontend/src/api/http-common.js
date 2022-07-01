import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:4000/api/vv1",
    headers: {
        "Content-type": "application/json"
    }
});