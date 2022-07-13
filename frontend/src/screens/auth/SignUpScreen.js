import React, { useState, useCallback } from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {SignUp} from '../../api/slices/users';
import { Navigate, useNavigate } from 'react-router-dom';

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

const SignUpScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const check = localStorage.getItem('user_info') 

    const { message, status } = useSelector(state => state.users);


    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState(null);
    const [lastName, setlastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [profile_pic, setProfile_pic] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = new FormData();
        formData.append('firstName', data.get('firstName'));
        formData.append('lastName', data.get('lastName'))
        formData.append('email', data.get('email'))
        formData.append('password', data.get('password'));
        formData.append('password2', data.get('password2'));
        formData.append('profile_pic', profile_pic);
        dispatch(SignUp(formData));

    };

    React.useEffect(() => {
        if (check) {
            navigate('/');
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
                        Sign up
                    </Typography>
                    <Typography component="p" variant="p">
                        {status == "loading" ? <p>Loading..</p> : status == "failed" ? message : message}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                   size="small"
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size="small"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size="small"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size="small"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size="small"
                                    required
                                    fullWidth
                                    name="password2"
                                    label="confirm password"
                                    type="password"
                                    id="password2"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <Box sx={{ mt: 2 }}>
                            <TextField 
                            fullWidth 
                            id="filled-basic" 
                            type="file" 
                            variant="outlined"
                            accept=".png, .jpg, .jpeg"
                            name="thumbnail"
                            size="small" 
                            onChange={(e) => { setProfile_pic(e.target.files[0]) }} />
                        </Box>

                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="remember me"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            size="small"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="secondary"
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link  variant="body2" component="button"
                                 onClick={
                                    ()=>{
                                    navigate('/signIn_screen')
                                    }
                                 }
                                 >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignUpScreen