import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { getUpdateUser, userProfile} from '../../api/slices/users';
import { useDispatch, useSelector } from 'react-redux';
import { CompressOutlined, FourGMobiledataRounded } from '@mui/icons-material';
import axios from 'axios';
const baseURL = `http://localhost:4000/api/user/updateUser`;










const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));


const Profile = () => {
    const theme = createTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const check = JSON.parse(localStorage.getItem('user_info'));
    const [user_info, setUserInfo] = useState(null);
    const [expanded, setExpanded] = React.useState(false);
    const { user, status, updateSuccess } = useSelector(state => state.users);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [image, setImage] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [userId, setUserId] = React.useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [update_user, setUpdate_user] = useState('');

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const update = async (e) =>{
        e.preventDefault();
        if(!email || !firstName || !lastName  || !password || !image ||  !userId)
        {
            alert("every field must be filled up!!!. you did not fill")
            return
        }
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('image', image)
        formData.append('password', password);
        formData.append('userId', userId);
        console.log("email ", email)
        try{
            const res = await axios.post(baseURL, formData);
            setUpdate_user(res.data.user);
            setFirstName(res.data.user.firstName);
            setLastName(res.data.user.lastName);
            setEmail(res.data.user.email);
            setImage(res.data.user.profile_pic);
            setUserId(res.data.userId);
            setMessage(res.data.message);
            setUserInfo(res.data.user_info);
        }
        catch(error)
        {
            setError(error.response.data.error);
        }
    }



    useEffect(() => {

        if(message || error || user_info) {

            

            if(message)
            {
                console.log(message);
                window.location.reload();
            }


            if(user_info)
            {
                localStorage.setItem('user_info', JSON.stringify(user_info));
            } 
            if(error)
            {
                alert(error);
                window.location.reload();
            }
            return
        }
        else{
        
        if (!check) {
            navigate('/');
        }
        else if(updateSuccess)
        {
            alert("Update success")
        }
        else if (!user || !user.firstName  || check.userId !== user._id) {
            const data = {id: check.userId}
            dispatch(userProfile(data));
        }
        else{
            setFirstName(user.firstName);
            setLastName(user.lastName)
            setEmail(user.email);
            setImage(user.profile_pic);
            setUserId(user._id);
        }
    }
    }, [user, dispatch, message, user_info, error])




    return (
        <div className="large-devices-margin">
                <Container >
                    <Card sx={{mt: 2, p: 2}}>
    
                    
                    <form onSubmit={update} enctype="multipart/form-data" method="post">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                            {
                              error ?  <Alert severity="error">{error}</Alert>  : message ? 
                              <Alert severity="success">{message}</Alert> : null
                         }
                                <Box sx={{mt: 2}}>
                                    <TextField fullWidth id="filled-basic" value={firstName} label="firstName" variant="outlined" size="small" name="firstName" onChange={(e) => { setFirstName(e.target.value) }} />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <TextField fullWidth id="filled-basic" value={lastName} label="lastName" variant="outlined" size="small" name="lastName" onChange={(e) => { setLastName(e.target.value) }} />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <TextField fullWidth id="filled-basic" value={email} label="email" variant="outlined" size="small" name="email"  onChange={(e) => { setEmail(e.target.value) }} disabled/>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <span>You cant upadate password here. password is needed for update others value</span>
                                    <TextField fullWidth type="password" id="filled-basic"  variant="outlined" size="small" name="email"  onChange={(e) => { setPassword(e.target.value) }}/>
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
                </Container>
        </div>
    )
}
export default Profile;

