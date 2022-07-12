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
import { findUserById } from '../api/slices/users';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



const UserEditScreen = ({ match, history }) => {
    let { id } = useParams();
    const dispatch = useDispatch();

    // const baseURL = `http://localhost:4000/api/vv1/posts/postDetails/${id}`;

    const { user, status } = useSelector(state => state.users);

    const navigate = useNavigate();
    const [res, setRes] = React.useState();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [image, setImage] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState('');
    const [verified, setVerified] = React.useState('');


    const initFetch = useCallback(() => {
        dispatch(findUserById(id))
    }, [dispatch])

    useEffect(() => {
        if(!user)
        {
            initFetch();
        }
        else{
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setEmail(user.email)
            setIsAdmin(user.isAdmin);
            setImage(user.profile_pic);
            setVerified(user.verified)
        }
    }, [initFetch, id, user])
    

   const update = (e) =>{
    //    e.preventDefault();
    //    const blog = { category: category, title: title, description: description, tags: tags, author: author, content: content }
    //    if(blog)
    //    {
    //        console.log(blog);
    //        alert("I am called")
    //        dispatch(updateBlog({ id, blog}));
    //        console.log("success");
    //    }
       
   }




    return (

        <div>
            {status == "loading" ? <Loaders /> : status == "failed" ? <h2>Error</h2> :

                <Container>
                    <h1>Edit A Post</h1>
                    <form onSubmit={update}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Box>
                                    <TextField fullWidth id="filled-basic" value={firstName} label="firstName" variant="outlined" size="small" name="firstName" onChange={(e) => { setFirstName(e.target.value) }} />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <TextField fullWidth id="filled-basic" value={lastName} label="lastName" variant="outlined" size="small" name="lastName" onChange={(e) => { setLastName(e.target.value) }} />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <TextField fullWidth id="filled-basic" value={email} label="email" variant="outlined" size="small" name="email"  onChange={(e) => { setEmail(e.target.value) }} />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                isAdmin : <Checkbox {...label} checked={!isAdmin ? false : true} />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                verified : <Checkbox {...label} checked={!verified ? false : true} />
                                </Box>

                            </Grid>
                            {/* <Grid item xs={8}>
                                <CKEditor editor={ClassicEditor}
                                    onChange={(e, editor) => setContent(editor.getData())} data={content}
                                />
                                <Box>
                                    {ReactHtmlParser(content)}
                                </Box>

                            </Grid> */}

                        </Grid>
                        <Button type="submit" variant="contained" color="primary" style={{ margin: '10px 0 10px 0' }}>
                            Update
                        </Button>
                    </form>
                </Container>
            }
        </div>
    )

}

export default UserEditScreen;