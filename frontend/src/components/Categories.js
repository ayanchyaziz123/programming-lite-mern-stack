import React, { useEffect, useCallback} from 'react';
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
import { useDispatch, useSelector } from "react-redux";
import {fetchCategories} from '../api/slices/categories'
import { ConstructionOutlined } from '@mui/icons-material';
import Loaders2 from './Loaders2';

const baseURL = `http://localhost:4000/api/vv1/blogs`;

const Categories = () => {
    
    const dispatch = useDispatch();
    let { id } = useParams();
    const { categories, message, status } = useSelector(state => state.category);
    // const categories = useSelector(state => state.category);
    // // console.log("cat : ", categories);


    const initFetch = useCallback(() => {
        dispatch(fetchCategories());
    }, [dispatch])

    useEffect(() => {

        initFetch();
    }, [initFetch])
    
 
   
    return (
        <div>

            {
                status == 'loading' ? <Loaders2/> : status == 'failed' ? <p>{message}</p> :
                !categories ? null : Object.keys(categories).map(cat => (
                    <Accordion sx={{ mt: 1 }} TransitionProps={{ unmountOnExit: true }} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content{cat}"
                            id="panel1a-header{cat}"
                            
                        >
                            <Typography><b>{cat}</b></Typography>
                        </AccordionSummary >
                        
                        {categories[cat].map(ord => (
                            <div >
                                <AccordionDetails>

                                    {/* <Typography component={Link} to={`/blogDetailScreen/${ord[1]}`} style={{ textDecoration: 'none' }} className={id == ord[1] ? 'alt-active' : null}> */}
                                    <CardActionArea component={Link} to={`/blogDetailScreen/${ord[1]}`} className={id == ord[1] ? 'alt-active' : null}>
                                        <Typography color='info'>
                                            {`${ord[0].substring(0, 50)}...`}
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