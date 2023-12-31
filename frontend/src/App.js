import React from "react";
import { useSelector } from "react-redux";
import { Header } from "./header/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./home/Home";
import { Blogs } from "./blogs/Blogs";
import { Auth } from "./auth/Auth";
import { Add } from "./blogs/Add";
import Profile from "./profile/Profile";
import BlogUpdate from "./blogs/BlogUpdate";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <div>
      <header>
        <Header />
      </header>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/add" element={<Add />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog/:id" element={<BlogUpdate />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
