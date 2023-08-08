import Blog from "../models/Blog.js";
import User from '../models/User.js';
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res) => {
  const { title, description, image, location, date, user } = req.body;
  if (
    !title ||
    title.trim() === "" ||
    !description ||
    description.trim() === "" ||
    !location ||
    location.trim() === "" ||
    !date ||
    !user ||
    !image ||
    image.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid data" });
  }

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  let blog;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    blog = new Blog({
      title,
      description,
      image,
      location,
      date: new Date(date),
      user,
    });

    // Check if existingUser.blogs exists before pushing the blog
    existingUser.blogs = existingUser.blogs || [];
    existingUser.blogs.push(blog);

    await existingUser.save({ session });

    blog = await blog.save({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: "Unexpected error occurred" });
  }

  return res.status(201).json({ blog });
};


export const getBlogById = async (req, res) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No post found" });
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description, image, location, user } = req.body;
  if (
    !title &&
    title.trim === "" &&
    !description &&
    description.trim === "" &&
    !location &&
    !location.trim === "" &&
    !user &&
    !image &&
    image.trim === ""
  ) {
    return res.status(422).json({ message: "invalid data" });
  }
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(id, {
      title,
      description,
      image,
      location,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ message: "Updated Successfully" });
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Populate the user before deletion
    const blog = await Blog.findById(id).populate("user");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog && blog.user && blog.user.blogs) {
      // Access the user's blogs property and remove the blog
      blog.user.blogs.pull(blog);
      await blog.user.save();
    }

    // Delete the blog
    await Blog.findByIdAndRemove(id);
    
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


 
