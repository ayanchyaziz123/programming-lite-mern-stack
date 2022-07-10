import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { createReply } from '../api/slices/blogs';



// const baseURL = `http://localhost:4000/api/vv1/posts/postDetails/`;

const Comment = ({ comments, replies }) => {
    let { id } = useParams();
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [post_id, setPost_id] = useState('');
    const [user_id, setUSer_id] = useState('');
    const [comment_id, setComment_id] = useState('');
    const [message, setMessage] = useState('');
    const user = JSON.parse(localStorage.getItem('user_info'));
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("tttt", post_id, user_id, text);
        // if (!user_info) {
        //     alert("please log in");
        //     return;
        // }
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
        // console.log("ccc", commentId, event.target.value, user_id, post_id);
    }




    return (
        <div>
            {
                comments.map(data => (
                    <div>

                        {/* <Grid container direction="row">
                            <Grid item sx={{mt: 2}}>
                                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" style={{maxHeight: '50px', maxWidth: '50px'}}></img>
                            </Grid>
                            <Grid item sx={{ ml: 2 }} className="text-color-dark">
                                <p>{data.name}</p>
                                <p>{data.comment}</p>
                                <button>reply</button>
                                {
                                    data.reply ? 
                                    <>
                                    {
                                        data.reply.map(rep=>(
                                            <Grid container direction="row" sx={{ mt: 2 }}>
                                                <Grid item>
                                                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" style={{ maxHeight: '50px', maxWidth: '50px' }}></img>
                                                </Grid>
                                                <Grid item sx={{ ml: 2 }}>
                                                    <p>{rep.name}</p>
                                                    
                                                    {
                                                       rep.reply
                                                    }
                                                </Grid>
                                            </Grid>
                                        ))
                                    }
                                    </>
                                    :
                                    null
                                }
                            </Grid>
                        </Grid> */}

                        <Grid container direction="row">
                            <Grid item sx={{ mt: 2 }}>
                                {/* <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" style={{ maxHeight: '50px', maxWidth: '50px' }}></img> */}
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {`${data.user.firstName.substring(0, 1)}`}
                                </Avatar>
                            </Grid>
                            <Grid item sx={{ ml: 2 }} className="text-color-dark">
                                <p>{data.user.firstName} {data.user.lastName}</p>
                                <p>{data.text}</p>
                                <h4>Reply</h4>
                                <form onSubmit={handleSubmit} enctype="multipart/form-data" method="post">
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={6}
                                    onChange={handleChange(data._id)}
                                    name="text"
                                    placeholder="Minimum 3 rows"
                                    style={{ width: 500 }}
                                />
                                <button>reply</button>
                            </form>
                                {
                                    data.reply ?
                                        <>
                                            {
                                                data.reply.map(rep => (
                                                    <Grid container direction="row" sx={{ mt: 2 }}>
                                                        <Grid item>
                                                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" style={{ maxHeight: '50px', maxWidth: '50px' }}></img>
                                                        </Grid>
                                                        <Grid item sx={{ ml: 2 }}>
                                                            <p>{rep}</p>

                                                            {
                                                                rep.text
                                                            }
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
            }

        </div>
    )
}
export default Comment;