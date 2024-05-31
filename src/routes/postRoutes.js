import express from "express";
import postController from "../controller/postController.js";
import authenticateJWT from "../middleware/authmiddleware.js";

const postRouter = express.Router();

postRouter.post("/create", authenticateJWT, postController.createPost);
postRouter.get("/getAllPosts", authenticateJWT, postController.getAllPosts);
postRouter.get("/getPostById/:id", authenticateJWT, postController.getPostById);
postRouter.put("/updatePost/:id", authenticateJWT, postController.updatePost);
postRouter.delete(
  "/deletePost/:id",
  authenticateJWT,
  postController.deletePost
);

export default postRouter;
