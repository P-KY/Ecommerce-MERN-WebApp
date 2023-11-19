import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
//import { Jwt } from "jsonwebtoken";
import JWT from "jsonwebtoken";

// POST REGISTER
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validation
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }
    if (!address) {
      return res.send({ error: "Address is required" });
    }
    // checking for user
    const existingUser = await userModel.findOne({ email });
    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User is already registered",
      });
    }
    const hashedPassword = await hashPassword(password);

    // saving
    const user = await new userModel({
      name,
      email,
      address,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User regisered successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registration failed",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    // validatin if required details are provided..
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    // checking if email is registered or not..
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    // authenticating the provided password..
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    // generating JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    // sending user details after successful login
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login attampt failed.",
      error,
    });
  }
};
