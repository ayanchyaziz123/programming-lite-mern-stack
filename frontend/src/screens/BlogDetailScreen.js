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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
    findBlogById, createComment
} from '../api/slices/blogs';
import Comment from '../components/Comment';




const BlogDetailScreen = ({ match, history }) => {

    let { id } = useParams();
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [post_id, setPost_id] = useState('');
    const [user_id, setUSer_id] = useState('');
    const [message, setMessage] = useState('');
    const user = JSON.parse(localStorage.getItem('user_info'));

    // const baseURL = `http://localhost:4000/api/vv1/posts/postDetails/${id}`;

    const { blog, status, comments, replies } = useSelector(state => state.blogs);


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("tttt", post_id, user_id, text);
        // if (!user_info) {
        //     alert("please log in");
        //     return;
        // }
        const formData = {
            "text": text,
            "post_id": post_id,
            "user_id": user_id
        }
        dispatch(createComment(formData));
    }




    useEffect(() => {
        dispatch(findBlogById({ id: id }));
        if(user) setUSer_id(user.userId);
        setPost_id(id);
    }, [dispatch])
    console.log("ccc", comments);




    return (

        <div>
            {status == "loading" ? <Loaders /> : status == "failed" ? <h2>Error</h2> :

                <div className='large-devices-margin'>
                    {/* <img src={`http://localhost:4000/${blog.image}`}></img> */}

                    <Grid container spacing={2} >
                        <Grid xs={12} md={6} lg={3.5} item sx={{ mt: 2 }} >
                            <Subscribe />
                            <Categories />


                        </Grid>

                        <Grid xs={12} md={6} lg={8.5} item>
                            <Card sx={{ mt: 2, p: 3, bgcolor: 'primary' }}>
                                <Typography variant="h5" sx={{ mt: 4 }} color='primary'>
                                    {blog.title}

                                </Typography>
                                <Typography variant="div" component="p" sx={{ mt: 4 }} color="primary">
                                    {blog.update_at} {blog.tags} {blog.author}
                                </Typography>
                                <Typography variant="div" sx={{ mt: 5 }}>
                                    {ReactHtmlParser(blog.content)}
                                </Typography>
                            </Card>
                            <Comment comments={comments} replies={replies}/>

                            <h4 className="text-color-dark">Comment Please</h4>
                            <form onSubmit={handleSubmit} enctype="multipart/form-data" method="post">
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={6}
                                    onChange={(event) => { setText(event.target.value) }}
                                    name="text"
                                    placeholder="Minimum 3 rows"
                                    style={{ width: 500 }}
                                />
                                <button>comment</button>
                            </form>

                        </Grid>

                    </Grid>

                </div>
            }
        </div>
    )

}

export default BlogDetailScreen;