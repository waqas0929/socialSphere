import { CLIENT_RENEG_LIMIT } from "tls";
import postModel from "../models/postModel.js";
import { log } from "console";

const postController = {
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;

      const userId = req.user.id;
      console.log(userId);

      if (!userId) {
        return res.status(401).json({ message: "User ID is missing" });
      }

      const newPost = await postModel.create({ title, content, userId });

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
      const post = await postModel.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
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
      const post = await postModel.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      await post.destroy();
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

export default postController;
