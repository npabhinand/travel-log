import React from "react";
import {
  Card,
  Avatar,
  IconButton,
  CardHeader,
  CardContent,
  Typography,
  Box,
  CardActions,
} from "@mui/material";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import { red } from '@mui/material/colors';

export const BlogItem = () => {
  return (
    <Card
      sx={{
        Width: "50%",
        height: "60vh",
        margin: 1,
        padding:1,
        display: "flex",
        flexDirection: "column",
        boxShadow: "5px 5px 10px #ccc",
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
          R
        </Avatar>}
        action={
          <IconButton aria-label="settings">
            <EditLocationAltIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <img
        width={"100%"}
        height={"50%"}
        src="./travel.jpeg"
        alt="Paella dish"
        justifyContent="center"
      />
      <CardContent>
        <Typography
          paddingBottom={1}
          variant="h6"
          color="text.secondary"
          justifyContent={"center"}
        >
          This impressive paella
        </Typography>
        <hr />
        <Box paddingTop={1} display={"flex"}>
          <Typography width="150px" fontWeight={"bold"} variant="caption">
            Abhinand Naryanan:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{marginLeft:"auto"}}>
        <IconButton color="warning"><EditOutlinedIcon/></IconButton>
        <IconButton color="error">< DeleteOutlineOutlinedIcon/></IconButton>
      </CardActions>
    </Card>
  );
};
