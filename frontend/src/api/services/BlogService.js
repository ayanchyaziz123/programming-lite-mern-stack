import http from "../http-common";
import http3 from "../http-3";
import http4 from "../http-4";

const fetchCategories = () =>{
    return http.get(`blogs/categories`);
}
const getAll = (keyword) => {
    return http.get(`${keyword}`);
};
const get = id => {
    return http.get(`/blogDetails/${id}`);
};
const create = ( blog ) => {
    return http3.post("/new", blog);
};
const createComment = (data) =>{
    return http4.post("/createComment", data);
};
const createReply = (data) =>{
    return http4.post("/createReply", data);
};
const update = ({ id, blog}) => {
    return http.put(`/blogUpdate/${id}`, blog);
};
const remove = id => {
    return http.delete(`/blogDelete/${id}`);
};
const removeAll = () => {
    return http.delete(`/tutorials`);
};
const findByTitle = title => {
    return http.get(`/tutorials?title=${title}`);
};
const findById = id => {
    return http.get(`/blogDetails/${id}`);
};

const TutorialService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
    findById,
    fetchCategories,
    createComment,
    createReply
};
export default TutorialService;