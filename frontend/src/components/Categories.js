import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import postData from '../data/postData';
import DetailsPostScreen from '../screens/BlogDetailScreen';
import { useParams } from "react-router";
import '../components/style.css';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';

const baseURL = `http://localhost:4000/api/vv1/blogs`;

const Categories = () => {

    let { id } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [categories, setCategories] = React.useState(null);

    const cats = categories ? categories.reduce((catMemo, { category, title, _id }) => {
        (catMemo[category] = catMemo[category] || []).push([title, _id]);
        return catMemo;
    }, {}) : null;


    React.useEffect(() => {


        setLoading(true);
        axios.get(baseURL).then((response)  => {
            setCategories(response.data.posts);
            //setCategories(response.data.categories);
            setLoading(false);
        }).catch((error) => {
            setError(true);
            setLoading(false);
        });
    



    }, []);
   
    return (
        <div>

            {
                !cats ? null : Object.keys(cats).map(cat => (
                    <Accordion sx={{ mt: 1 }} TransitionProps={{ unmountOnExit: true }} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content{cat}"
                            id="panel1a-header{cat}"
                            
                        >
                            <Typography><b>{cat}</b></Typography>
                        </AccordionSummary >
                        
                        {cats[cat].map(ord => (
                            <div >
                                <AccordionDetails>

                                    {/* <Typography component={Link} to={`/blogDetailScreen/${ord[1]}`} style={{ textDecoration: 'none' }} className={id == ord[1] ? 'alt-active' : null}> */}
                                    <CardActionArea component={Link} to={`/blogDetailScreen/${ord[1]}`} className={id == ord[1] ? 'alt-active' : null}>
                                        <Typography color='info'>
                                            {ord[0]}
                                        </Typography>
                                        </CardActionArea>
                            
                                
                                  

                                </AccordionDetails>
                            </div>
                        ))}
                    </Accordion>
                ))
            }



        </div>
    )
}

export default Categories;