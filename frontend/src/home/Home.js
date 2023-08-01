import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div style={{ marginTop: 50,marginLeft:-5 }}>
      <Box position={"relative"} width="100%" height="90vh">
        <img src="./road.jpg" alt="road" width={"100%"} height={"80%"} />
        <Typography
          variant="h3"
          textAlign={'center'}
          fontWeight={"bold"}
          fontFamily={"Dancing Script,cursive"}
          width={"100%"}
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background:"#B2CBDF",
            color:"#111115de"
          }}
        >
          Dare to live the life you've always wanted
        </Typography>
      </Box>
      <Box width="100%"  display="flex" flexDirection={"column"}>
        <Typography textAlign={'center'} variant="h4" padding={4}
        fontFamily={"Quicksand"}>
          SHARE YOUR TRAVEL DIARIES WITH US
        </Typography>
        <Box margin={"auto"}>
          <Button variant="outlined" sx={{mr:2}}>
            Share Your Diaries
          </Button>
          <Button variant="contained" LinkComponent={Link} to="/blogs" sx={{ml:2}}>View Diaries</Button>
        </Box>
      </Box>
    </div>
  );
};
