import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import sendEmailNotification from "../services/emailNotificationServices.js";
import errorHandler from "../utils/errorHandler.js";

const postController = {
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;

      const userIdFromToken = req.user.id;
      const userIdFromParams = req.params.id;

      // console.log(userIdFromToken);
      // console.log(userIdFromParams);


      if (userIdFromToken !== userIdFromParams) {
        return res.status(401).json({ message: "User ID is not correct" });
      }

      const user = await userModel.findByPk(userIdFromToken);
      if (!user) {
        return errorHandler(res, "USER_NOT_FOUND");
      }

      const userEmail = user.email;

      let imageUrl = null;
      if (req.file) {
        imageUrl = req.file.path;
      }

      const newPost = await postModel.create({
        title,
        content,
        userId: userIdFromToken,
        imageUrl,
      });

      const subject = "Post Created Successfully";
      const emailContent =
        "Thank You for using SocialSphere! Your post has been created successfully";
      await sendEmailNotification(userEmail, subject, emailContent);

      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await postModel.findAll();

      if (posts.length === 0) {
        return res.status(404).json({ message: "No posts found" });
      }

      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await postModel.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { title, content } = req.body;
      
      const userIdFromToken = req.user.id;
      const userIdFromParams = req.params.id;
      
      // console.log(userIdFromToken);
      // console.log(userIdFromParams);
      
      
      if (userIdFromToken !== userIdFromParams) {
        return res.status(401).json({ message: "User ID is not correct" });
      }
      
      const post = await postModel.findByPk(req.params.id);


      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if(post.userId !== userIdFromToken){
        return res.status(403).json({message:"Not authorized to update this post"})
      }

      post.title = title || post.title;
      post.content = content || post.content;
      await post.save();

      res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  deletePost: async (req, res) => {
    try {

      const userIdFromToken = req.user.id;
      const postId = req.params.id;
  
      // console.log("User ID from token:", userIdFromToken);
      // console.log("Post ID from params:", postId);

      const post = await postModel.findByPk(postId);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      if (post.userId !== userIdFromToken) {
        return res.status(401).json({ message: "User ID is not correct" });
      }


      if (post.userId !== userIdFromToken){
        return res.status(403).json({message:"Not authorized to delete this post"})
      }

      const user = await userModel.findByPk(post.userId);
      if (!user) {
        return errorHandler(res, "USER_NOT_FOUND");
      }

      const userEmail = user.email;

      await post.destroy();

      const subject = "Post Created Successfully";
      const emailContent =
        "Thank You for using SocialSphere! Your post has been created successfully";
      await sendEmailNotification(userEmail, subject, emailContent);

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

export default postController;
