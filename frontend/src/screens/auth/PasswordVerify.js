import React, { useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router';
import { Card, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';



const PasswordVerify = () => {
    const [verified, setVerified] = useState(true);
    const navigate = useNavigate();
    let { id } = useParams();
    let { token } = useParams();
    const [user_info, setUser_info] = React.useState('');
    const [status, setStatus] = React.useState(false);
    const [error, setError] = React.useState('');
    const baseURL = `http://localhost:4000/api/user/resetPassword_verification/${id}/${token}`;
    const baseURL2 = `http://localhost:4000/api/user/updatePassword/${id}/${token}`;
    const [message, setMessage] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    if (user_info) {
        localStorage.setItem('user_info', JSON.stringify(user_info));
        navigate("/");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password != confirmPassword){
            console.log("password dont match")
            return;
        }
        const data = {
            password: password,
            confirmPassword: confirmPassword
        }
        try {
            console.log("hello")
            await axios.put(baseURL2, data).then(res => {
                setMessage(res.data.message);
                setUser_info(res.data.user_info);
                setStatus(true)
            })
            console.log('Show error notification!1111')
        }
        catch (error) {
            console.log("err", error.response.data.error)
            setError(error.response.data.error);
        }
    }

    React.useEffect(async () => {

        try {
            console.log("hello")
            await axios.get(baseURL).then(res => {
                setMessage(res.data.message);
                setStatus(true)
            })
            console.log('Show error notification!1111')
        }
        catch (error) {
            setError(error.response.data.error);
        }
    }, [id, token, user_info])

    if (status == true) {
        return (<>
            <Container className="bg-color">
                <Card>
                <Typography component="p" variant="p">
                    {status == "loading" ? <p>Loading..</p> : status == "failed" ? message : <h2>{message}</h2>}
                </Typography>
                <h1>Enter newpassword</h1>
                <form onSubmit={handleSubmit} enctype="multipart/form-data" method="post">
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Box>
                                <TextField fullWidth id="filled-basic" className="text-color-dark" label="Password" variant="outlined" size="small" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <TextField fullWidth id="filled-basic" label="Confirm Password" variant="outlined" size="small" name="confirmPassword" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                            </Box>



                        </Grid>


                    </Grid>
                    <Button type="submit" variant="contained" color="primary" style={{ margin: '10px 0 10px 0' }}>
                        Save
                    </Button>
                </form>
                </Card>
            </Container>
        </>)
    }
    else {
        return (
            <div className="large-devices-margin">
                {
                    error ? <Alert sx={{ mt: 5, text: 'center' }} severity="error">{error}</Alert> : <h2>{message}</h2>
                }
            </div>
        )
    }
}
export default PasswordVerify;