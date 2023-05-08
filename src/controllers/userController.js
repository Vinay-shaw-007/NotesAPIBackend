const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //Existing user check
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //User creation
    const user = await userModel.create({
      email,
      password: hashedPassword,
      username,
    });

    //Token generation
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
    res.status(201).json({ user: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Existing user check
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //Check password
    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //Token generation
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signIn, signUp };
