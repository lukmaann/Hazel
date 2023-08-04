import { Router } from "express";
import { createPost, getFeedPosts, getUserPosts,commentOnPost, likePost, delpost } from "../controllers/postControllers.js"

import auth from "../middlewre/auth.js"
import { createReport } from "../controllers/reportController.js";

const router = Router();

/* READ */

router.route('/explore').get(getFeedPosts)
router.route('/:userId/post').get(auth,getUserPosts)

// --------------------------upload--------

router.route('/uploadpost').post(createPost)
router.route('/delpost').post(delpost)
router.route('/reportPost').post(createReport)



// ------------------------------patch-------
router.route("/like").patch(likePost)
router.route('/comment').patch(commentOnPost)



export default router;