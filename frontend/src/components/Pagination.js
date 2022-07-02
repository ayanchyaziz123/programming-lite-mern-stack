import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { Pages } from '@mui/icons-material';
export default function BasicPagination({pages, page, keyword='', isAdmin=''}) {
  const navigate = useNavigate();
  const [cur, setCur] = React.useState(null);
  if (keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0]
}
  const handleChange = (event, value) =>{
    if(isAdmin) 
    {
      navigate(`/blogsListScreen/?keyword=${keyword}&page=${value}`);
    }
    else{
      navigate(`/?keyword=${keyword}&page=${value}`);
    }
    setCur(value);
  } 
  return (
    <>
      { 
        pages ? <Pagination count={parseInt(pages)} page={parseInt(page)} color="secondary" onChange={handleChange} /> : null
      }
      </>
  );
}