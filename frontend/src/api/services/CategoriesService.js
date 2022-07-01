import http from "../http-common";

const fetchCategories = () =>{
    return http.get(`/categories`);
}

const CategoryService = {
    fetchCategories
};
export default CategoryService;