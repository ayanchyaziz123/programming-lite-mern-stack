import React, { useState, useEffect, useCallback } from 'react';
import Post from '../components/Blog';
import { useDispatch, useSelector } from "react-redux";
import CustomeSwitch from '../components/CustomeSwitch';
import Card from '@mui/material/Card';
import Categories from '../components/Categories';
import Subscribe from '../components/Subscribe';
import { Typography } from '@mui/material';
import Loaders from '../components/Loaders';
import { useParams } from "react-router";
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import RichTextField from '../components/RichTextField';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
    findBlogById,
    updateBlog,
} from '../api/slices/blogs';



const BlogEditScreen = ({ match, history }) => {
    let { id } = useParams();
    const dispatch = useDispatch();

    // const baseURL = `http://localhost:4000/api/vv1/posts/postDetails/${id}`;

    const blogDetailes = useSelector(state => state.blogs);
    const { blog, status } = blogDetailes;

    const navigate = useNavigate();
    const [res, setRes] = React.useState();
    const [category, setCategory] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [content, setContent] = React.useState('');
    const [blogId, setBlogId] = React.useState('');



    const update = async (e) => {
        e.preventDefault();
        const blog = { category: category, title: title, description: description, tags: tags, author: author, content: content }
        if (blog) {
            await dispatch(updateBlog({ id, blog }));
            navigate('/')
        }


    }


    const initFetch = useCallback(() => {
        dispatch(findBlogById({ id: id }));
    }, [dispatch, id, blog])

    useEffect(() => {
        if (!blog || id !== blog._id) {
            console.log(blog, id, blog._id)
            initFetch();
        }
        else {
            setCategory(blog.category);
            setTitle(blog.title);
            setDescription(blog.description);
            setTags(blog.tags);
            setAuthor(blog.author);
            setContent(blog.content);
            setBlogId(blog._id);
        }
    }, [initFetch])







    return (

        <div className="large-devices-margin">
            <Card>
                {status == "loading" ? <Loaders /> : status == "failed" ? <h2>Error</h2> :

                    <Container>
                        <h1>Edit A Post</h1>
                        <form onSubmit={update}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextField fullWidth id="filled-basic" value={category} label="Category" variant="outlined" size="small" name="category" onChange={(e) => { setCategory(e.target.value) }} />
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <TextField fullWidth id="filled-basic" value={title} label="Title" variant="outlined" size="small" name="title" onChange={(e) => { setTitle(e.target.value) }} />
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <TextField fullWidth id="filled-basic" value={description} label="Description" variant="outlined" size="small" name="description" onChange={(e) => { setDescription(e.target.value) }} />
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <TextField fullWidth id="filled-basic" value={tags} label="Tags" variant="outlined" size="small" name="tags" onChange={(e) => { setTags(e.target.value) }} />
                                    </Box>

                                    <Box sx={{ mt: 2 }}>
                                        <TextField fullWidth id="filled-basic" value={author} label="Author" variant="outlined" size="small" name="author" onChange={(e) => { setAuthor(e.target.value) }} />
                                    </Box>

                                </Grid>
                                <Grid item xs={8}>
                                    <CKEditor editor={ClassicEditor}
                                        onChange={(e, editor) => setContent(editor.getData())} data={content}
                                    />
                                    <Box>
                                        {ReactHtmlParser(content)}
                                    </Box>

                                </Grid>

                            </Grid>
                            <Button type="submit" variant="contained" color="primary" style={{ margin: '10px 0 10px 0' }}>
                                Update
                            </Button>
                        </form>
                    </Container>
                }
            </Card>
        </div>
    )

}

export default BlogEditScreen;