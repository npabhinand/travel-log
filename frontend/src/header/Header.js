import React, { useState } from "react";
import { AppBar, Tabs, Toolbar, Tab } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const linksArr = [
  { label: "Home", path: "/" },
  { label: "Blogs", path: "/blogs" },
  { label: "Auth", path: "/auth" },
];
const loggedInLinks = [
  { label: "Home", path: "/" },
  { label: "Blogs", path: "/blogs" },
  { label: "Add", path: "/add" },
  { label: "Profile", path: "/profile" },
];

export const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState(0); // Set initial value to 0

  const navigationLinks = isLoggedIn ? loggedInLinks : linksArr;

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar>
      <Toolbar sx={{ bgcolor: "white", position: "sticky" }}>
        <TravelExploreIcon sx={{ color: "black" }} />
        <Tabs
          value={value}
          onChange={handleTabChange}
          sx={{ ml: "auto", textDecoration: "none" }}
        >
          {navigationLinks.map((link, index) => (
            <Tab
              component={Link}
              to={link.path}
              sx={{
                textDecoration: "none",
                ":hover": {
                  textDecoration: "underline",
                  textUnderlineOffset: "17px",
                },
              }}
              key={index}
              label={link.label}
              value={index}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};


