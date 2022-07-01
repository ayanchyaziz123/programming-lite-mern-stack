import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';

const Jumbotron = () =>{
    return(
        <div >
            <Card sx={{ mt: 1, mb: 1 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://media-exp1.licdn.com/dms/image/C5612AQEE81jISPXKqQ/article-cover_image-shrink_600_2000/0/1520199296951?e=2147483647&v=beta&t=bVMZHSIwar7RY07s0SaSD9m4gBhpTeQf_SFZHONcChc"
                        alt="green iguana"
                        sx={{ height: 350 }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            ProgrammingLite.com
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>

    )
}

export default Jumbotron;