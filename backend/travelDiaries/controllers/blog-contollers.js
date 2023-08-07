import Blog from "../models/Blog.js";

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
    !title &&
    title.trim === "" &&
    !description &&
    description.trim === "" &&
    !location &&
    !location.trim === "" &&
    !date &&
    !user &&
    !image &&
    image.trim === ""
  ) {
    return res.status(422).json({ message: "invalid data" });
  }

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }
  let blog;
  try {
    blog = new Blog({
      title,
      description,
      image,
      location,
      date: new Date(`${date}`),
      user,
    });
    const session = mongoose.startSession();
    session.startTransaction();

    existingUser.blogs.push(blog);
    await existingUser.save({ session });

    blog = await blog.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "unexpected error occured" });
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
  const { title, description, image, location, date, user } = req.body;
  if (
    !title &&
    title.trim === "" &&
    !description &&
    description.trim === "" &&
    !location &&
    !location.trim === "" &&
    !date &&
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
      date: new Date(`${date}`),
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

export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  let blog;
  try {
    const session=await mongoose.startSession();
    session.startTransaction();
    blog=await Blog.findById(id).populate("user");
    blog.user.blogs.pull(blog);
    await blog.user.save({session});
    blog = await Blog.findByIdAndRemove(id);
    session.commitTransaction();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Deleted Successfully" });
};
