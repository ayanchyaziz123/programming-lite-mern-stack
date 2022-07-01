import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import Container from '@material-ui/core/Container';
import Post from '../components/Blog';
import { useDispatch, useSelector } from "react-redux";
import CustomeSwitch from '../components/CustomeSwitch';
import { useParams } from "react-router";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Categories from '../components/Categories';
import Subscribe from '../components/Subscribe';
import { Typography } from '@mui/material';
import Loaders from '../components/Loaders';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
    findBlogById,
} from '../api/slices/blogs';
import Comment from '../components/Comment';



const BlogDetailScreen = ({ match, history }) => {
   
    let { id } = useParams();
    const dispatch = useDispatch();

    // const baseURL = `http://localhost:4000/api/vv1/posts/postDetails/${id}`;

    const { blog, status } = useSelector(state => state.tutorials);


  
   

        const initFetch = useCallback(() => {
            dispatch(findBlogById({ id: id }));
        }, [dispatch, id])

        useEffect(() => {
            initFetch();
        }, [initFetch])
        console.log("ccc", blog);




    return (
        
        <div>
            {status == "loading" ? <Loaders/> : status == "failed" ? <h2>Error</h2> : 
            
                <div className='large-devices-margin'>
                
                <Grid container spacing={2} >
                        <Grid xs={12} md={6} lg={3.5} item sx={{ mt: 2 }} >
                            <Subscribe />
                            <Categories />


                        </Grid>

                        <Grid xs={12} md={6} lg={8.5} item>
                            <Card sx={{ mt: 2, p: 3, bgcolor: 'primary'}}>
                        <Typography variant="h5" sx={{mt: 4}} color='primary'>
                            {blog.title}

                        </Typography>
                        <Typography variant="div" component="p" sx={{ mt: 4 }} color="primary">
                           {blog.update_at} {blog.tags} {blog.author}
                        </Typography>
                        <Typography variant="div" sx={{mt: 5}}>
                            {ReactHtmlParser(blog.content)}
                        </Typography>
                        </Card>
                            <Comment />

                    </Grid>
                       
                </Grid>
               
            </div>
}
        </div>
    )

}

export default BlogDetailScreen;