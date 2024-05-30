import express from "express"
import userController from "../controller/authController.js"
import authenticateJWT from "../middleware/authmiddleware.js"

const userRouter = express.Router()


userRouter.post("/signup", userController.signup)
userRouter.post("/signin",  userController.signin)
userRouter.get('/profile', authenticateJWT, userController.getUserProfile)
userRouter.put('/profile', authenticateJWT, userController.updateUserProfile)
userRouter.delete('/profile', authenticateJWT, userController.deleteUserProfile)


export default userRouter