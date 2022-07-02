import React, { useEffect, useCallback} from 'react';
import Container from '@material-ui/core/Container';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import Jumbotron from '../components/Jumbotron';
import Categories from '../components/Categories';
import Subscribe from '../components/Subscribe';
import Blog from '../components/Blog';
import Loaders from '../components/Loaders';
import { useDispatch, useSelector } from "react-redux";
import CustomeSwitch from '../components/CustomeSwitch';
import Alert from '@mui/material/Alert';
import {
    retrieveBlogs,
} from '../api/slices/blogs';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import {useLocation} from "react-router-dom";


// const baseURL = `http://localhost:4000/api/vv1/posts`;



const HomeScreen = () =>{
    

   

    const dispatch = useDispatch();
    const { blogs, message, status, page, pages } = useSelector(state => state.blogs);

    const [searchParams] = useSearchParams();
    // const keyword = searchParams.get('keyword');
    // const p = searchParams.get('page');
    const keyword = useLocation().search;

    

    useEffect(() => {
         dispatch(retrieveBlogs(keyword));
    }, [dispatch, keyword])

    // console.log("Blog : ", blog.blogs.posts);
    


    return(
        <div className="large-devices-margin">

            
            <Jumbotron />
            
            <Grid container spacing={2} >
                <Grid xs={12} md={6} lg={3.5} sx={{ mt: 2 }} item>
                    <Subscribe />
                    <Categories />

                </Grid>
                {
                    blogs.length <= 0 && status === 'success' ? <h4>No data found</h4>:
                <Grid xs={12} md={6} lg={8.5}  item>
                    {status === "loading" ? <Loaders />
                        : status === "failed" ? <Alert severity="error">{message}</Alert>
                        :
                        <div>
                                {blogs ? blogs.map(data => (
                        <div key={data.id}>
                            <Blog blog={data}/>
                        </div>
                    )) : null}
                    </div>
}

                   <Pagination pages={pages} page={page} keyword={keyword}/>  
                </Grid>
               
                }
               
            </Grid>
        
        </div>
    )
}

export default HomeScreen;