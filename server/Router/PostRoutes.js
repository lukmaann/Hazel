import { Router } from "express";
import { createPost, getFeedPosts, getUserPosts, likePost } from "../controllers/postControllers.js"

import auth from "../middlewre/auth.js"

const router = Router();

/* READ */

router.route('/explore').get(getFeedPosts)
router.route('/:userId/post').get(auth,getUserPosts)

// --------------------------upload--------

router.route('/uploadpost').post(createPost)



// ------------------------------patch-------
router.route("/:id/like").patch(auth,likePost)


export default router;