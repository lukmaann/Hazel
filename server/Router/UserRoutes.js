import { Router } from "express";
import { getUser } from "../controllers/appController.js";
import { getUserFriends } from "../controllers/usercontroller.js";
import { addRemoveFriend } from "../controllers/usercontroller.js";
import auth from "../middlewre/auth.js"

const router=Router();

/* READ */
router.route("/user/:username").get(getUser)
// router.get("/:id/friends", auth, getUserFriends);
router.route('/:id/friends').get(getUserFriends)

/* UPDATE */
router.patch("/:id/:friendId", auth, addRemoveFriend);

export default router;