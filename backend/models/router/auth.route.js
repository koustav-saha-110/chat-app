import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { login, logout, signup, update } from "../controllers/auth.controller.js";
const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', protectedRoute, logout);

router.put('/update', protectedRoute, update);
router.get('/me', protectedRoute, async (req, res) => {
    res.send({
        success: true,
        user: req.user
    }).status(200);
});

export default router;
