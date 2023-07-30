const { hashSync, genSaltSync } = require('bcrypt');
const User = require('../models/User')
const getAllUsers = async (req, res) => {
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

module.exports = getAllUsers;




const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || name.trim() === "" || !email || email.trim() === "" || !password || password.length < 6) {
        return res.status(422).json({ message: "Invalid Data" });
    }
    //generating hashed password
    try {
        const salt = genSaltSync(10); // Generate a salt with a cost factor of 10
        const hashedpassword = hashSync(password, salt);
        const user = new User({ email, name, password: hashedpassword });
        await user.save();
        return res.status(201).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "unexpected error occurred" });
    }
}

module.exports = signup;

