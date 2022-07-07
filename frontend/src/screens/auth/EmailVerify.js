import React from 'react';
import { useParams } from "react-router";
import axios from 'axios';

const EmailVerify =()=>{
    let { id } = useParams();
    let {token} = useParams();
    const baseURL = `http://localhost:4000/api/user/SignUp_verification/${id}/${token}`;
   

    const [message, setMessage] = React.useState('');
    console.log("mmmm", message);

    React.useEffect(() => {
        try{
            axios.get(baseURL).then(res=>{
                const msg = res.data.message;
                const st = res.message.status;
                setMessage(msg);
            })
        }
        catch(error)
        {
            console.log("cnsl", error);
        }
    }, [id, token])

    return(
        <>
        <h3>{id} Hello world {id}</h3>
        </>
    )
}
export default EmailVerify;