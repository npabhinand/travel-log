import { FormLabel, TextField, Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { SendAuthRequest } from "../api-helpers/helps";
import {useDispatch} from "react-redux"
import { authActions } from "../store";

export const Auth = () => {
  const dispatch=useDispatch();
  const [isSignup, setIsSignup] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      SendAuthRequest(true, inputs)
        .then((data) =>localStorage.setItem("userId",data.user._id))
        .then(()=>{dispatch(authActions.login())})
        .catch((err) => console.log(err));
    } else {
      SendAuthRequest(false, inputs)
        .then((data) =>localStorage.setItem("userId",data.id))
        .then(()=>{dispatch(authActions.login())})  
        .catch((err) => console.log(err));
    }
  };
  
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Box
      width="40%"
      borderRadius={10}
      boxShadow={"5px 5px 10px #ccc"}
      margin="auto"
      marginTop={20}
    >
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          width="60%"
          padding={5}
          margin="auto"
        >
          <Typography padding={1} variant="h4" textAlign={"center"}>
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <>
              <FormLabel>Name</FormLabel>
              <TextField
                value={inputs.name}
                name="name"
                onChange={handleChange}
                required
                margin="normal"
              />
            </>
          )}

          <FormLabel>Email</FormLabel>
          <TextField
            value={inputs.email}
            required
            margin="normal"
            name="email"
            onChange={handleChange}
          />
          <FormLabel>Password</FormLabel>
          <TextField
            margin="normal"
            value={inputs.password}
            required
            name="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, borderRadius: 10 }}
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button
            type="submit"
            variant="outlined"
            sx={{ mt: 2, borderRadius: 10 }}
          >
            {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};
