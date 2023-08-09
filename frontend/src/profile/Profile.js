import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../api-helpers/helps';
import { Box, Typography, Button } from '@mui/material';
import { BlogItem } from '../blogs/BlogItem';
import {useDispatch} from 'react-redux';
import {authActions}from '../store';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [user, setUser] = useState();
  const dispatch =useDispatch();
  const navigate=useNavigate();
  
  useEffect(() => {
    getUserDetails()
      .then((data) => {
        console.log(data); // Log the fetched data
        setUser(data.user);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleClick=()=>{
    dispatch(authActions.logout());
    localStorage.removeItem("userId");
    navigate("/")
  }
  
  return (
    <Box display="flex" flexDirection="column" marginTop={10}>
      {user ? (
        <>
          <Typography
            textAlign="center"
            variant="h3"
            fontFamily="quicksand"
            padding={2}
          >
            User Profile
          </Typography>
          <Typography fontFamily="quicksand" padding="1" textAlign="left" marginLeft={5}>
            Name: {user.name}
          </Typography>
          <Typography fontFamily="quicksand" padding="1" textAlign="left" marginLeft={5} marginBottom={2}>
            Email: {user.email}
          </Typography>
          <Button sx={{ mr: "auto",marginLeft:5 }} color="warning" variant="contained" onClick={handleClick} marginLeft={5}>
            Logout
          </Button>
          
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {user.blogs ? (
              user.blogs.map((blog, index) => (
                <BlogItem
                  key={index}
                  title={blog.title}
                  date={blog.date}
                  description={blog.description}
                  id={blog.id}
                  image={blog.image}
                  location={blog.location}
                  user={user._id}
                />
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </Box>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
};

export default Profile;
