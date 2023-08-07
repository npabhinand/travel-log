import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BlogItem } from "./BlogItem";
import { getAllBlogs } from '../api-helpers/helps';

export const Blogs = () => {
  // Define a state to store the blogs data
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs()
      .then(data => {
        console.log("Data from API:", data);
        setBlogs(data.blogs); // Assuming 'blogs' is the property containing the array
      })
      .catch(err => console.log(err));
  }, []);
  

  return (
    <Box
      marginTop={10}
      display="flex"
      flexDirection={"column"}
      padding="3"
      justifyContent={"center"}
      alignItems="center"
    >
      {blogs && blogs.map((item, index) => (
        <BlogItem
          date={new Date(`${item.date}`).toLocaleDateString()}
          description={item.description}
          key={index}
          image={item.image}
          id={item._id}
          location={item.location}
          title={item.title}
        />
      ))}
    </Box>
  );
};

