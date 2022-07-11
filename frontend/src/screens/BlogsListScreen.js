import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Typography } from '@mui/material';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loaders from '../components/Loaders';
import Pagination from '../components/Pagination';
import {useLocation, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    retrieveBlogs,
} from '../api/slices/blogs';

const baseURL = `http://localhost:4000/api/blog/blogs`;




const BlogsListScreen = (props) => {
    const [postDatas, setPostDatas] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const isAdmin = true;
    const keyword = useLocation().search;


    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { blogs, message, status, page, pages } = useSelector(state => state.blogs);
    const redirect = location.state;
    const check = JSON.parse(localStorage.getItem('user_info'));


    
    React.useEffect(() => {
        if (!check.isAdmin) {
            navigate(redirect ? redirect : '/');
        }
         dispatch(retrieveBlogs(keyword));
    }, [dispatch, keyword])

    const deletePost = (id) => {
        var proceed = window.confirm("Are you sure you want to delete?");
        if (proceed) {
            axios.delete(`http://localhost:4000/api/blog/blogDelete/${id}`).then((res) => {
                console.log("post deleted");


            }).catch((error) => {
                alert("Did not delete")
                console.log(error);
            })

            window.location.reload(true);
        } 
        

    }


    return (
        <Container>
            <Button component={Link} to="/blogAddScreen" variant="contained" color="secondary" size="small" style={{ margin: '10px 0 10px 0' }}>
                Add A Post
            </Button>
            {status == 'loading' ? <Loaders /> : status == 'failed' ? <h2>{message}</h2> :
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {blogs.map((post, i) => (
                                <TableRow
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="right"> {`${post.title.substring(0, 20)}...`}</TableCell>
                                    <TableCell align="right">{post.category}</TableCell>
                                    <TableCell align="right">
                                        <Button value="My name is here" onClick={() => deletePost(post._id)} variant="contained" color="primary" size="small" sx={{ mr: 2 }}>Delete</Button>
                                        <Typography component={Link} to={`/blogEditScreen/${post._id}`} sx={{ mr: 1 }}>Update</Typography>
                                        <Typography component={Link} to="/" sx={{ mr: 1 }}>View</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <hr></hr>
            <Pagination pages={pages} page={page} keyword={keyword} isAdmin={isAdmin}/>  
        </Container>
    );
}

export default BlogsListScreen;