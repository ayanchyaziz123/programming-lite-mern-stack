import React, { useEffect } from 'react';
import { Card, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
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
    color: theme.palette.text.secondary,
}));


const Profile = () => {
    const theme = createTheme();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user_info'));
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    useEffect(() => {
        const check = localStorage.getItem('user_info') 
        if (!check) {
            navigate('/');
        }
    }, [user])



    return (
        <div className="large-devices-margin">
            <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={2}>
                

                <Avatar sx={{width: 200, height: 200, bgcolor: deepPurple[500] }} alt="Remy Sharp" src={`http://localhost:4000/${user ? user.profile_pic : null}`} title="profile"/>

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
                <Grid item xs={8}>
                    <Item>

                        <Typography variant="h5"  component="div">
                            First Name: {user.firstName}
                        </Typography >
                        <Typography variant="h5" gutterBottom component="div">
                            Last Name: {user.lastName}
                        </Typography>
                        <Typography variant="h5" gutterBottom component="div">
                            Email : {user.email}
                        </Typography>
                        <hr></hr>
                        <Typography variant="h5" gutterBottom component="div">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Typography>
                        <hr></hr>



                    </Item>
                </Grid>
               
            </Grid>
        </div>
    )
}
export default Profile;

