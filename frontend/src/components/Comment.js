import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Grid from '@mui/material/Grid';


const comment = [
    {
        name: "ayan chy",
        comment: "In publishing and graphic design, ",
        reply:[
            {
                name: "nakib",
                reply: "great"
            },
            {
                name: "tamima",
                reply: "thanks"
            }

        ]
    },
    {
        name: "Tamima chy",
        comment: "bad tutorial"
    },
    {
        name: "mehjabin ferdous",
        comment: "beautiful",
        reply: [
            {
                name: "nakib",
                reply: "great"
            },
            {
                name: "tamima",
                reply: "thanks"
            }

        ]
    }
]

const Comment = () => {
    return (
        <div>
            {
                comment.map(data=>(
                    <div>
                        
                        <Grid container direction="row">
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
                        </Grid>

                    </div>
                ))
            }
            <h4 className="text-color-dark">Comment Please</h4>
            <TextareaAutosize
                aria-label="minimum height"
                minRows={6}
                placeholder="Minimum 3 rows"
                style={{ width: 500 }}
            />
            <button>comment</button>
        </div>
    )
}
export default Comment;