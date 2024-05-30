import userModel from "../models/userModel.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import tokenModel from "../models/tokenModel.js";

const userController = {
  signup: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      const existingUser = await userModel.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }

      // Hash the password
      const hashedPassword = await hash(password, 10);

      // Create new user
      const newUser = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const comparePassword = await compare(password, user.password);
      if (!comparePassword) {
        return res.status(404).json({ message: "Invalid credentials" });
      }

      const data = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        // lastName: checkUser.lastName,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "1hour",
      });
      await tokenModel.create({
        token,
        userId: user.id,
      });

      res.json({ data, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const user = await userModel.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return res.status(404).json({ message: "user not fund" });
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },
  // updateUserProfile
  updateUserProfile: async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const user = await userModel.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      await user.save();

      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  // deleteUserProfile
  deleteUserProfile: async (req, res) => {
    try {
      const user = await userModel.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Delete Profile Error:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

export default userController;
