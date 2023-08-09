import { Router } from "express";
import { createPost, getFeedPosts, getUserPosts,commentOnPost, likePost, delpost, getsinglepost } from "../controllers/postControllers.js"

import auth from "../middlewre/auth.js"
import { createReport, deleteReport, getReports } from "../controllers/reportController.js";

const router = Router();

/* READ */

router.route('/explore').get(getFeedPosts)
router.route('/:userId/post').get(auth,getUserPosts)
router.route('/getreports').get(getReports)
router.route('/deletereport/:reportId').get(deleteReport)
router.route('/getsinglepost/:postId').get(getsinglepost)
// --------------------------upload--------

router.route('/uploadpost').post(createPost)
router.route('/delpost').post(delpost)
router.route('/reportpost').post(createReport)



// ------------------------------patch-------
router.route("/like").patch(likePost)
router.route('/comment').patch(commentOnPost)



export default router;