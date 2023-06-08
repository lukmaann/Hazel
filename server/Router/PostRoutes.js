import { Router } from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/postControllers.js"
import { verifyToken } from "../middleware/auth.js";
import auth from "../middlewre/auth.js";

const router = Router();

/* READ */

router.route('/explore').get(auth,getFeedPosts)
router.route('/:userId/post').get(auth,getUserPosts)

router.patch("/:id/like", verifyToken, likePost);

export default router;