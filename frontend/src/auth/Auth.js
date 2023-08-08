import {  TextField, Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { SendAuthRequest } from "../api-helpers/helps";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

export const Auth = () => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(true);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  
    if (isSignup) {
      SendAuthRequest(true, inputs)
        .then((data) => {
          console.log("Response data:", data);
          if (data && data.id) {
            localStorage.setItem("userId", data.id);
            dispatch(authActions.login());
          } else {
            console.log("Authentication failed.");
          }
        })
        .catch((err) => console.log(err));
    } else {
      SendAuthRequest(false, inputs)
        .then((data) => {
          console.log("Response data:", data);
          if (data && data.id) {
            localStorage.setItem("userId", data.id);
            dispatch(authActions.login());
          } else {
            console.log("Authentication failed.");
          }
        })
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
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={10}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}{" "}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};
