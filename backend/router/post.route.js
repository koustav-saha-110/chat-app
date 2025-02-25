import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { createPost, deletePost, getPosts, likePost } from "../controllers/post.controller.js";
const router = Router();

router.get('/', protectedRoute, getPosts);
router.post('/add', protectedRoute, createPost);
router.put('/like-dislike/:id', protectedRoute, likePost);
router.delete('/delete/:id', protectedRoute, deletePost);

export default router;
