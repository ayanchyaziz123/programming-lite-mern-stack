import React, { useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router';


const EmailVerify = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    let { token } = useParams();
    const [user_info, setUser_info] = React.useState('');
    const [error, setError] = React.useState('');
    const baseURL = `http://localhost:4000/api/user/SignUp_verification/${id}/${token}`;
    const [message, setMessage] = React.useState('');

    if(user_info)
    {
        localStorage.setItem('user_info', JSON.stringify(user_info));
        navigate("/");
    }

    React.useEffect(async () => {
        try {
            console.log("hello")
            await axios.get(baseURL).then(res => {
                setUser_info(res.data.user_info)
                setMessage(res.data.message);
                console.log(res.data);
            })
            console.log('Show error notification!1111')
        }
        catch (error) {
            setError(error.response.data.error);
        }
    }, [id, token, user_info])

    return (
        <div className="large-devices-margin">
            {
                error ? <Alert sx={{mt: 5, text: 'center'}} severity="error">{error}</Alert> : <h2>{message}</h2>
            }
        </div>
    )
}
export default EmailVerify;