import bcrypt from "bcryptjs";
import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(500).json({ message: "unexpected Error Occured" });
  }
  return res.status(200).json({ users });
};



export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the required fields are provided
    if (!name || !email || !password) {
      return res.status(422).json({ message: "Name, email, and password are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Return the newly created user
    return res.status(201).json({ user });
  } catch (err) {
    console.log("Error in signup:", err);
    return res.status(500).json({ message: "Unexpected error occurred during signup" });
  }
};




export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "" || !password || password.length < 6) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "No User found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  return res.status(200).json({ id: existingUser._id, message: "Login successful" });
};


export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).populate("blogs");
    if (!user) {
      return res.status(404).json({ message: "No User found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error in getUserById:", err);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
};
