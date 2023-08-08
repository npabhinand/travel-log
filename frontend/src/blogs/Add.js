import React, { useState } from "react";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import { addBlog } from "../api-helpers/helps";



export const Add = () => {
  const [inputs, setInputs] = useState({title:"",description:"",location:"",imageUrl:"",date:""})

    const handleChange=(e)=>{
      setInputs((prevstate)=>({
        ...prevstate,
        [e.target.name]:e.target.value,

      }))
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      console.log(inputs)
      addBlog(inputs).then((res)=>console.log(res)).catch(err=>console.log(err))
    }
  return (
    <div>
      <Box
        display="flex"
        flexDirection={"column"}
        width="100%"
        height={"100%"}
        marginTop={10}
      >
        <Box fontWeight={"bold"} display={"flex"} margin={"auto"} padding={2}>
          <Typography variant="h4" fontFamily={"Dancing Script"}>
            Add your Travel Experience
          </Typography>
          <ModeOfTravelIcon
            sx={{ fontSize: "40px", paddingLeft: 1, color: "lightCoral" }}
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box
            width={"80%"}
            padding={3}
            display={"flex"}
            margin={"auto"}
            flexDirection={"column"}
          >
            <FormLabel sx={{ fontFamily: "quickSand" }}>Title</FormLabel>
            <TextField name="title" value={inputs.title} onChange={handleChange} variant="standard" margin="normal" />

            <FormLabel sx={{ fontFamily: "quickSand" }}>Description</FormLabel>
            <TextField name="description" value={inputs.description} onChange={handleChange} variant="standard" margin="normal" />

            <FormLabel sx={{ fontFamily: "quickSand" }}>Image URL</FormLabel>
            <TextField name="imageUrl" value={inputs.imageUrl} onChange={handleChange} variant="standard" margin="normal" />

            <FormLabel sx={{ fontFamily: "quickSand" }}>Location</FormLabel>
            <TextField name="location" value={inputs.location} onChange={handleChange} variant="standard" margin="normal" />
            
            <FormLabel sx={{ fontFamily: "quickSand" }}>Date</FormLabel>
            <TextField type="date" name="date" value={inputs.date} onChange={handleChange} variant="standard" margin="normal" />

            <Button
            type="submit"
              color="warning"
              sx={{ mt: 2, width: "50%", margin: "auto", borderRadius: 7 }}
              variant="contained">
              Post
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};
