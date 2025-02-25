import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
const router = Router();

router.get('/:id', protectedRoute, getMessages);
router.post('/send/:id', protectedRoute, sendMessage);

export default router;
