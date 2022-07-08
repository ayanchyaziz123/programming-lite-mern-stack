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
                        image="https://img.freepik.com/free-photo/workplace-with-smartphone-laptop-black-table-top-view-copyspace-background_144627-24860.jpg?w=2000"
                        alt="green iguana"
                        sx={{ height: 350 }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            ProgrammingLite.com
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            A website for learning all about programming
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>

    )
}

export default Jumbotron;