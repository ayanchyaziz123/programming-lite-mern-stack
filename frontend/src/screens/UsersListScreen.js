import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Container, Typography } from '@mui/material';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loaders from '../components/Loaders';
import Pagination from '../components/Pagination';
import {useLocation, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from '../api/slices/users';
import { red, purple, brown  } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import PreviewIcon from '@mui/icons-material/Preview';






const UsersListScreen = (props) => {
    const isAdmin = true;
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { users, message, status } = useSelector(state => state.users);
    const redirect = location.state;
    const check = JSON.parse(localStorage.getItem('user_info'));


    
    React.useEffect(() => {
        if (!check.isAdmin) {
            navigate(redirect ? redirect : '/');
        }
         dispatch(getUsers());
    }, [dispatch])

    const deleteUser = (event, id)  => {
        event.preventDefault();
        const baseURL = `http://localhost:4000/api/user/deleteUser/${id}`;
        var proceed = window.confirm("Are you sure you want to delete?");
        if (proceed) {
            axios.delete(baseURL).then((res) => {
                alert("post deleted");
                window.location.reload(true);

            }).catch((error) => {
                alert("Did not delete")
            })

          
        } 
    }
    const disabled  = (id) =>{
        var disabled;
        if(check.userId == id)
        {
            disabled = true;
        }
        else{
            disabled = false;
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
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">IsAdmin</TableCell>
                                <TableCell align="right">Photo</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, i) => (
                                <TableRow
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="right"> {`${user.firstName.substring(0, 20)}...`}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.isAdmin ? 'yes' : 'no'} {user._idss}</TableCell>
                                    <TableCell align="right"> <Avatar sx={{  }} alt="Remy Sharp" src={`http://localhost:4000/${user.profile_pic}`} >
                                </Avatar></TableCell>
                                   
                                    <TableCell align="right">
                                    {/* <Button value="My name is here" onClick={(event) => deleteUser(event, user._id)} variant="contained" color="warning" size="small" sx={{ mr: 2 }} disabled={user._id == check.userId ? true : false}><DeleteIcon/></Button> */}
                                        <hr></hr>
                                        <Button variant="contained"  component={Link} to={`/userEditScreen/${user._id}`} sx={{ ml: 1 }} color="primary" disabled={user._id == check.userId ? true : false}><EditRoadIcon/></Button>
                                      
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Container>
    );
}

export default UsersListScreen;