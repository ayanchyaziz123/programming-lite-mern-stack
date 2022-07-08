import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(0),
    // textAlign: 'center',
    // color: theme.palette.text.secondary,

    boxShadow: "none"

}));


const Blog = ({ blog}) => {

  let theme = localStorage.getItem("theme");
    return(
          <Grid item xs={12} md={12}>
                {/* <CardActionArea > */}
          <Card sx={{ display: 'flex', mb: '17px' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
                            {`${blog.title.substring(0, 60)}...`}
            </Typography>
            <Typography variant="subtitle1">
                                {blog.update_at} @ {blog.tags}
            </Typography>
            <Typography variant="subtitle1" paragraph>
                                {`${blog.description.substring(0, 150)}...`}
            </Typography>
                            <Typography variant="subtitle1">
                            <Button variant="contained" color="secondary" size="small" component={Link} to={`/blogDetailScreen/${blog._id}`}>More...</Button>                
              
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                            image={`http://localhost:4000/${blog.image}`}
            alt={blog.imageLabel}
          />
        </Card>
      {/* </CardActionArea> */}
    </Grid>
    )
}

export default Blog;