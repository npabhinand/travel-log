import React, { useState } from "react";
import { AppBar, Tabs, Toolbar, Tab } from "@mui/material";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Link } from "react-router-dom";

const linksArr = [
  { label: "Home", path: "/" },
  { label: "Blogs", path: "/blogs" },
  { label: "Auth", path: "/auth" },
];

export const Header = () => {
  const [value, setValue] = useState(0); // Set initial value to 0

  return (
    <AppBar >
      <Toolbar sx={{ bgcolor: "white", position: "sticky" }}>
        <TravelExploreIcon sx={{ color: "black" }} />
        <Tabs
  value={value}
  onChange={(e, val) => setValue(val)}
  sx={{ ml: "auto", textDecoration: "none" }}
>
  {linksArr.map((link, index) => (
    <Tab
      component={Link}
      to={link.path}
      sx={{
        textDecoration: "none",
        ":hover": { textDecoration: "underline", textUnderlineOffset: '17px' }
      }}
      key={index}
      label={link.label} // Assuming link.label is a string
      value={index}
    />
  ))}
</Tabs>

      </Toolbar>
    </AppBar>
  );
};
