import React, { useEffect } from 'react';
import { Card, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Profile = () => {
    const theme = createTheme();
    const user = JSON.parse(localStorage.getItem('user_info'));
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (!user) {
            Navigate('/');
        }
    }, [user])



    return (
        <div className="large-devices-margin">
            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={8}>
                    <Item>

                        <Typography variant="h4" gutterBottom component="div">
                            First Name: {user.firstName}
                        </Typography >
                        <Typography variant="h4" gutterBottom component="div">
                            Last Name: {user.lastName}
                        </Typography>
                        <Typography variant="h4" gutterBottom component="div">
                            Email : {user.email}
                        </Typography>



                    </Item>
                </Grid>
                <Grid item xs={4}>
                

                    <Avatar sx={{width: 200, height: 200, bgcolor: deepPurple[500] }} alt="Remy Sharp" src="https://play-lh.googleusercontent.com/I-Yd5tJnxw7Ks8FUhUiFr8I4kohd9phv5sRFHG_-nSX9AAD6Rcy570NBZVFJBKpepmc" title="profile"/>

                        {/* <Box
                            component="img"
                            sx={{
                                height: 233,
                                width: 350,
                                maxHeight: { xs: 233, md: 167 },
                                maxWidth: { xs: 350, md: 250 },
                            }}
                            alt="The house from the offer."
                            src=""
                        /> */}
                   
                </Grid>
            </Grid>
        </div>
    )
}
export default Profile;

