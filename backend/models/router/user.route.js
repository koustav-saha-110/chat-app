import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getUsers, searchUsers } from "../controllers/user.controller.js";
const router = Router();

router.get('/', protectedRoute, getUsers);
router.get('/search/:query', protectedRoute, searchUsers);

export default router;
