import { Box } from "@mui/material";
import React from "react";
import { BlogItem } from "./BlogItem";

export const Blogs = () => {
  return (
   
      <Box marginTop={10} display="flex" flexDirection={"column"} padding="3"
       justifyContent={"center"} alignItems="center">
        {" "}
        {[1,2,3,4,5].map((item)=> <BlogItem />)}

       
      </Box>

  );
};
