import userModel from "../models/userModel.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import tokenModel from "../models/tokenModel.js";
import errorHandler from "../utils/errorHandler.js";
import sendEmailNotification from "../services/emailNotificationServices.js";

const userController = {
  signup: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      const existingUser = await userModel.findOne({ where: { email } });
      if (existingUser) {
        return errorHandler(res, "EMAIL_ALREADY_EXIST");
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

      const subject = "Welcome to SocialSphere";
      const content = "Thank You for signing up!";
      await sendEmailNotification(email, subject, content);

      errorHandler(res, "USER_REGISTER_SUCCESSFULLY", newUser);
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "internal error" });
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ where: { email } });

      if (!user) {
        return errorHandler(res, "USER_NOT_FOUND");
      }

      const now = new Date();

      // Check if the account is permanently locked
      if (user.isPermanentlyLocked) {
        return errorHandler(res, "ACCOUNT_PERMANENTLY_LOCKED");
      }

      // Check if the account is temporarily locked
      if (user.accountLockUntil && user.accountLockUntil > now) {
        user.failedLoginAttempts += 1;

        // Permanently lock the account after 3 failed attempts during lockout
        if (user.failedLoginAttempts >= 3) {
          user.isPermanentlyLocked = true;
          user.accountLockUntil = null; // Clear the lock time
          user.failedLoginAttempts = 0; // Reset the counter after permanent locking
          await user.save();
          return errorHandler(res, "ACCOUNT_PERMANENTLY_LOCKED");
        } else {
          await user.save();
          return errorHandler(res, "ACCOUNT_LOCKED");
        }
      }

      // Validate the password
      const comparePassword = await compare(password, user.password);

      if (!comparePassword) {
        user.failedLoginAttempts += 1;

        // Temporarily lock the account after 3 failed attempts
        if (user.failedLoginAttempts >= 3) {
          user.accountLockUntil = new Date(now.getTime() + 5 * 60000); // Lock for 5 minutes
          user.failedLoginAttempts = 0; // Reset the counter after locking
          await user.save();
          return errorHandler(res, "ACCOUNT_LOCKED");
        } else {
          await user.save();
          return errorHandler(res, "INVALID_CREDENTIALS");
        }
      }

      // Reset failed attempts on successful login
      user.failedLoginAttempts = 0;
      user.accountLockUntil = null;
      user.isPermanentlyLocked = false;
      await user.save();

      const data = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      };
      const tokenExpiration = new Date(Date.now() + 60 * 60 * 1000);

      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      await tokenModel.create({
        token,
        tokenExpiration,
        userId: user.id,
      });

      res.json({ data, token });
    } catch (error) {
      console.error(error);
      errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const user = await userModel.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return errorHandler(res, "USER_NOT_FOUND");
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },
  // updateUserProfile
  updateUserProfile: async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const user = await userModel.findByPk(req.user.id);

      if (!user) {
        return errorHandler(res, "USER_NOT_FOUND");
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      await user.save();

      errorHandler(res, "UPDATE_USER_SUCCESSFULLY", user);
    } catch (error) {
      console.error("Update Profile Error:", error);
      errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },

  // deleteUserProfile
  deleteUserProfile: async (req, res) => {
    try {
      const user = await userModel.findByPk(req.user.id);

      if (!user) {
        return errorHandler(res, "USER_NOT_FOUND");
      }

      const userEmail = user.email;

      await user.destroy();

      const subject = "Account Deleted Successfully";
      const content = "Thank You for using SocialSphere!";
      await sendEmailNotification(userEmail, subject, content);

      errorHandler(res, "USER_DELETED_SUCCESSFULLY");
    } catch (error) {
      console.error("Delete Profile Error:", error);
      errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },
};

export default userController;
