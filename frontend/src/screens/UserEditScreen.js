import React, { useState, useEffect, useCallback } from 'react';
import Post from '../components/Blog';
import { useDispatch, useSelector } from "react-redux";
import CustomeSwitch from '../components/CustomeSwitch';
import Card from '@mui/material/Card';
import Categories from '../components/Categories';
import Subscribe from '../components/Subscribe';
import { Alert, Typography } from '@mui/material';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import axios from 'axios';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const baseURL = `http://localhost:4000/api/user/updateAdminUser`;



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
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [verified, setVerified] = React.useState(false);
    const [userId, setUserId] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');

   const handleVerified = (e) =>{
        if(verified) setVerified(false)
        else setVerified(true);
    }

    const handleAdmin = (e) =>{
        if(isAdmin) setIsAdmin(false);
        else setIsAdmin(true);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!firstName || !lastName || !email ||  !userId || !image)
        {
            console.log("fn ", firstName, email);
            alert("all field need to be filled");
            return;
        }
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('image', image);
        formData.append('userId', userId);
        formData.append('verified', verified);
        formData.append('isAdmin', isAdmin);

        try{
            const res = await axios.post(baseURL, formData);
           setMessage(res.data.message)
           alert("update completed");
     
        }
        catch(error)
        {
            alert("Not Updated")
            setError(error.response.data.error);
        }

    }


    const initFetch = useCallback(() => {
        dispatch(findUserById(id))
    }, [id, user])

    useEffect(() => {
        if(error)
        {
            alert(error);
            return;
        }
       
        if(!user || id != user._id)
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
            setUserId(id);
        }
    }, [initFetch])
    

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

        <div className="large-devices-margin">
            {status == "loading" ? <Loaders /> : status == "failed" ? <h2>Error</h2> :

            
                    <Card sx={{p: 2}}>
                    <h1>Edit An User</h1>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                        
                            <Grid item xs={6}>
                                <Box sx={{mb: 2}}>
                                {
                              error ?  <Alert severity="error">{error}</Alert>  : message ? <Alert severity="success">{message}</Alert>: null
                         }
                                </Box>
                                <Box>
                                    <TextField fullWidth id="filled-basic" value={firstName} label="firstName" variant="outlined" size="small" name="firstName" onChange={(e) => { setFirstName(e.target.value) }} />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <TextField fullWidth id="filled-basic" value={lastName} label="lastName" variant="outlined" size="small" name="lastName" onChange={(e) => { setLastName(e.target.value) }} />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <TextField fullWidth id="filled-basic" value={email} label="email" variant="outlined" size="small" name="email"  onChange={(e) => { setEmail(e.target.value) }} disabled/>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                <FormControlLabel control={<Checkbox checked={!isAdmin ? false : true} />} label="isAdmin" onClick={handleAdmin}/>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                <FormControlLabel control={<Checkbox checked={!verified ? false : true} />} label="verified" onClick={handleVerified}/>
                                </Box>

                            </Grid>
                            <Grid item xs={4} sx={{ml: 2}}>
                            <Box sx={{ }}>
                            <TextField 
                            fullWidth 
                            id="filled-basic" 
                            type="file" 
                            variant="outlined"
                            accept=".png, .jpg, .jpeg"
                            name="image"
                            size="small" 
                            onChange={(e) => { setImage(e.target.files[0]) }} />
                        </Box>
                            <Avatar sx={{width: 200, height: 200, bgcolor: deepPurple[500], mt: 3 }} alt="Remy Sharp" src={`http://localhost:4000/${image}`} title="profile"/>
                           
  
                            </Grid>

                        </Grid>
                        <Button type="submit" variant="contained" color="primary" style={{ margin: '10px 0 10px 0' }}>
                            Update
                        </Button>
                    </form>
                    </Card>
            }
        </div>
    )

}

export default UserEditScreen;