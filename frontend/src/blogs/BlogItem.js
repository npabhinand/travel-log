import React,{useState} from "react";
import {
  Card,
  Avatar,
  IconButton,
  CardHeader,
  CardContent,
  Typography,
  Box,
  CardActions,
  Alert,
  Snackbar,
} from "@mui/material";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import { blogDelete } from "../api-helpers/helps";
// import { red } from '@mui/material/colors';

export const BlogItem = ({ title, description, image, location, date, id,user }) => {

  const [open, setOpen] = useState(false)
  const isLoggedInUser = () => {
    if (localStorage.getItem("userId") === id) {
      return true;
    }
    else{
      return false;
    }
    
  };

  const handleDelete=()=>{
    blogDelete(id)
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err));
    setOpen(true);
  }
  return (
    <Card
      sx={{
        Width: "50%",
        height: "60vh",
        margin: 1,
        padding: 1,
        display: "flex",
        flexDirection: "column",
        boxShadow: "5px 5px 10px #ccc",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <EditLocationAltIcon />
          </IconButton>
        }
        title={title}
        header={location}
        subheader={date}
      />
      <img
        width={"100%"}
        height={"50%"}
        src={image}
        alt={title}
        justifycontent="center"
      />
      <CardContent>
        <Typography
          paddingBottom={1}
          variant="h6"
          color="text.secondary"
          justifycontent={"center"}
        >
          {title}
        </Typography>
        <hr />
        <Box paddingTop={1} display={"flex"}>
          <Typography width="150px" fontWeight={"bold"} variant="caption">
            Abhinand Naryanan:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
      {isLoggedInUser() && (
        <CardActions sx={{ marginLeft: "auto" }}>
          <IconButton color="warning" LinkComponent={Link} to={`/blog/${id}`}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleDelete} color="error">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </CardActions>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
        <Alert onClose={()=>setOpen(false)} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </Card>
  );
};
