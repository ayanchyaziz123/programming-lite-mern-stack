import http from "../http-common";

const fetchCategories = () =>{
    return http.get(`blogs/categories`);
}
const getAll = (keyword) => {
    return http.get(`/blogs/${keyword}`);
};
const get = id => {
    return http.get(`/blogDetails/${id}`);
};
const create = ( blog ) => {
    return http.post("/new", blog);
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
    fetchCategories
};
export default TutorialService;