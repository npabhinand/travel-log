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


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || name.trim() === "" || !email || email.trim() === "" || !password || password.length < 6) {
        return res.status(422).json({ message: "Invalid Data" });
    }

    // Generating hashed password
    try {
        const hashedPassword = bcrypt.hashSync(password);// Generate a salt with a cost factor of 10 and hash the password
        const user = new User({ email, name, password: hashedPassword });
        await user.save();
        return res.status(201).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unexpected error occurred" });
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

