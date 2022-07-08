import React from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import RichTextField from '../components/RichTextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {useDispatch, useSelector} from 'react-redux';
import {
    createBlog
} from '../api/slices/blogs';
import http from '../api/http-3';

const baseURL = `http://localhost:4000/api/vv1/new`;


const BlogAddScreen = () =>{

    const dispatch = useDispatch();
    const { status, message } = useSelector(state => state.blogs);
    const navigate = useNavigate();
    const [res, setRes] = React.useState();
    const [category, setCategory] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [content, setContent] = React.useState('');
    const [thumbnail, setThumbnail] = React.useState(null);
    


    const handleSubmit =  async (event) =>{
        event.preventDefault();
        // const blog = { category: category, title: title, description: description, tags: tags, author: author, content: content, thumbnail: thumbnail }
        //     dispatch(createBlog({blog: blog}));
        // navigate("/blogsListScreen");
        
        // axios.post(baseURL, {post}).then((response) => {
        //         setRes(response.data.post);
        //     alert("It worked, response is: ",res);
        //     navigate("/postListScreen");
        //     }).catch((error) =>{
        //         console.log(error);
        //     });

        const formData = new FormData();
        formData.append("category", category);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", tags);
        formData.append("author", author);
        formData.append("content", content);
        formData.append("thumbnil", thumbnail);
        // for (var value of formData.values()) {
        //     console.log(value); 
        //  }

        dispatch(createBlog(formData));
        // navigate("/blogsListScreen");


    }


    return(
       <Container className="bg-color">
             <Typography component="p" variant="p">
                        {status == "loading" ? <p>Loading..</p> : status == "failed" ? message : <h2>Blog successfylly added</h2>}
                 </Typography>
            <h1>Add A New Post</h1>
           <form onSubmit={handleSubmit}  enctype="multipart/form-data" method="post">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box>
                            <TextField  fullWidth id="filled-basic"  className="text-color-dark" label="Category" variant="outlined" size="small" name="category" onChange={(e)=>{setCategory(e.target.value)}}/>
                        </Box>
                        <Box sx={{mt:2}}>
                            <TextField fullWidth id="filled-basic" label="Title" variant="outlined" size="small" name="title" onChange={(e)=>{setTitle(e.target.value)}}/>
                    </Box>
                        <Box sx={{mt:2}}>
                            <TextField fullWidth id="filled-basic" label="Description" variant="outlined" size="small" name="description" onChange={(e)=>{setDescription(e.target.value)}}/>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                            <TextField fullWidth id="filled-basic" label="Tags" variant="outlined" size="small" name="tags" onChange={(e) => { setTags(e.target.value)}}/>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                            <TextField fullWidth id="filled-basic" label="Author" variant="outlined" size="small" name="author" onChange={(e)=> { setAuthor(e.target.value) }}/>
                    </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField 
                            fullWidth 
                            id="filled-basic" 
                            type="file" 
                            variant="outlined"
                            accept=".png, .jpg, .jpeg"
                            name="thumbnail"
                            size="small" 
                            onChange={(e) => { setThumbnail(e.target.files[0]) }} />
                        </Box>
               
                </Grid>
                <Grid item xs={8}>
                        <CKEditor editor={ClassicEditor}
                            onChange={(e, editor) => setContent(editor.getData())}
                        />
                        <Box>
                                {ReactHtmlParser(content)}
                        </Box>
                      
                </Grid>
                   
            </Grid>
                <Button size="small" type="submit" variant="contained" color="secondary" style={{ margin: '10px 0 10px 0' }}>
                Save
            </Button>
            </form>
       </Container>
    )
}

export default BlogAddScreen;