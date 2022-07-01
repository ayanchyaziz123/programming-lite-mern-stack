import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Footer = () =>{

       
        
    return(
        
        <div>

               
         
            <AppBar position="static" color="warning" sx={{mt:50}}>
                <Container maxWidth="md">
                    <Toolbar>
                        <Typography variant="body1" color="inherit">
                            © 2019 Gistia
                
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>

        </div>
    )
}

export default Footer;