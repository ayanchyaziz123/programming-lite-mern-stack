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
import { useLocation, useNavigate } from 'react-router-dom';




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

const theme = createTheme();

const SignInScreen = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();



    const { message, status, user_info } = useSelector(state => state.users);
    const redirect = location ? location.state : null;
    localStorage.setItem('redirect', JSON.stringify(redirect));

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),

        });
        const user = { email: data.get('email'), password: data.get('password') }
        dispatch(SignIn({ user: user }));

    };
    if (user_info && user_info.email) {
        localStorage.setItem('user_info', JSON.stringify(user_info));
        // const previous = localStorage.getItem('redirect');
        // // localStorage.removeItem('redirect')
        // // alert("hello");
        console.log("red", redirect);
        navigate(redirect ? redirect : '/');
    }

    useEffect(() => {
        const check = localStorage.getItem('user_info') 
        if (check && check.email) {
            navigate(redirect ? redirect : '/');
        }
    }, [user_info, redirect])
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
                        Sign in
                    </Typography>
                    <Typography component="p" variant="p">
                        {status == "loading" ? <p>Loading..</p> : status == "failed" ? message : message}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            size="small"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                           size="small"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"

                        />

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            size="small"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="secondary"
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>


                                <Link variant="body2" component="button"
                                    onClick={
                                        () => {
                                            navigate('/forgetPassword_screen')
                                        }
                                    }
                                >
                                    Forgot password
                                </Link>

                            </Grid>
                            <Grid item>
                                <Link variant="body2" component="button"
                                    onClick={
                                        () => {
                                            navigate('/signUp_screen')
                                        }
                                    }
                                >
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
        
    );
}
export default SignInScreen;