import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { red, purple, brown  } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { createReply } from '../api/slices/blogs';
import ReactTimeAgo from 'react-time-ago';
import { Button } from '@mui/material';




// const baseURL = `http://localhost:4000/api/vv1/posts/postDetails/`;

const Comment = ({ comments, id }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [post_id, setPost_id] = useState('');
    const [user_id, setUSer_id] = useState('');
    const [comment_id, setComment_id] = useState('');
    const [message, setMessage] = useState('');
    const user = JSON.parse(localStorage.getItem('user_info'));
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!text)
        {
            alert("You did not give any reply!!!");
            return
        }
        if(!user)
        {
            alert("Please Login first");
            return
        }
        const formData = {
            "text": text,
            "post_id": post_id,
            "user_id": user_id,
            "comment_id": comment_id
        }
        dispatch(createReply(formData));
    }

    const handleChange = commentId => (event) => {
        setComment_id(commentId)
        setText(event.target.value);
        setPost_id(id);
        setUSer_id(user.userId);
    }




    return (
        <div>
            {comments.length > 0 ? 
                comments.map(data => (
                    <div>
                        <Grid container direction="row" item>
                            <Grid item sx={{ mt: 2 }}>
                                {/* <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" style={{ maxHeight: '50px', maxWidth: '50px' }}></img> */}
                                <Avatar sx={{ bgcolor: red[500] }} alt="Remy Sharp" src={`http://localhost:4000/${data.user.profile_pic}`} >
                                </Avatar>
                            </Grid>
                            <Grid item sx={{ ml: 2 }} className="text-color-dark">
                                <h4 style={{ margin: 0, textAlign: "left" }}>{data.user.firstName} {data.user.lastName}</h4>
                                <p style={{ textAlign: "left" }}>{data.text}</p>
                                <p style={{ textAlign: "left", color: "gray" }}>
                                <ReactTimeAgo date={data.date} locale="en-US"/>
                                </p>
                                <h4>Reply</h4>

                                <form onSubmit={handleSubmit} enctype="multipart/form-data" method="post">
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={6}
                                        onChange={handleChange(data._id)}
                                        name="text"
                                        placeholder="Reply here.."
                                        style={{ width: 500 }}
                                    />
                                    <br></br>
                                    <Button type="submit" variant="contained" size="small" color="secondary">Reply</Button>
                                </form>
                                {
                                    data.reply ?
                                        <>
                                            {
                                                data.reply.map(rep => (
                                                    <Grid container direction="row" sx={{ mt: 2 }}>
                                                        <Grid item>
                                                            {/* <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" style={{ maxHeight: '50px', maxWidth: '50px' }}></img> */}
                                                            <Avatar sx={{ bgcolor: red[500] }} alt="Remy Sharp" src={`http://localhost:4000/${rep.user.profile_pic}`} >
                            
                                                                {rep.user.firstName ? `${rep.user.firstName.substring(0, 1)}` : null}
                                                            </Avatar>
                                                        </Grid>
                                                        <Grid item sx={{ ml: 2 }}>
                                                            <h4 style={{ margin: 0, textAlign: "left" }}>{rep.user.firstName} {rep.user.lastName} </h4>

                                                            <p style={{ textAlign: "left" }}>{rep.text}</p>
                                                            <p style={{ textAlign: "left", color: "gray" }}>
                                                            <ReactTimeAgo date={rep.date} locale="en-US"/>
                                                            </p>
                                                        </Grid>
                                                    </Grid>
                                                ))
                                            }
                                        </>
                                        :
                                        null
                                }
                            </Grid>
                        </Grid>



                    </div>
                ))
                :
                null
            }

        </div>
    )
}
export default Comment;