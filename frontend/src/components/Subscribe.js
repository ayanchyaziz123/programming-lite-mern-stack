import React from 'react';
import Card from '@mui/material/Card';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Subscribe = () =>{
    return(
        <Card sx={{ p: 2}}>
         
            <GitHubIcon/>
            <FacebookIcon/>
            <InstagramIcon/>
        </Card>
    )
}
export default Subscribe;