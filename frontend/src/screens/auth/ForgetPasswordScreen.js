import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignIn } from '../../api/slices/users';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const baseURL = "http://localhost:4000/api/user/resetPassword";

const theme = createTheme();

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(null);
    const [user_info, setUser_info] = useState('');
    
    const check = JSON.parse(localStorage.getItem('user_info'));
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = { email: data.get('email') };
        console.log(email)
        setLoading(1);
        try {

            await axios.post(baseURL, email).then(res => {
                setMessage(res.data.msg);
            })

        }
        catch (err) {
            setError(err.response.data);
        }
        setLoading('');
    }

    useEffect(() => {
          
            if(check)
            {
                navigate("/");
            }

    }, [check])
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Typography component="p" variant="p">
                        {loading ? <p>Loading..</p> : error ? error : message}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Enter Your Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />

                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
            
                            
                            <Link  variant="body2" component="button"
                             onClick={
                                ()=>{
                                navigate('/forgetPassword_screen')
                                }
                             }
                             >
                                Forgot password
                            </Link>
                           
                        </Grid>
                        <Grid item>
                            <Link  variant="body2" component="button"
                             onClick={
                                ()=>{
                                navigate('/signUp_screen')
                                }
                             }
                             >
                                Don't have an account? Sign Up
                            </Link>
                        </Grid> */}
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}
export default ForgetPassword;