import express from "express";
import {
  deletePost,
  getAllPosts,
  getPosts,
  publishPost,
  updateBlog,
} from "../controllers/postController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.use(authMiddleware);

router.post("/", publishPost);
router.get("/bulk", getAllPosts);
router.get("/:id", getPosts);
router.delete("/:id", deletePost);
router.put("/:id", updateBlog);

export default router;
