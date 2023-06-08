import { Router } from "express";
import { getUser } from "../controllers/appController.js";
import { getUserFriends } from "../controllers/usercontroller.js";
import { addRemoveFriend } from "../controllers/usercontroller.js";
import auth from "../middlewre/auth.js"

const router=Router();

/* READ */
router.route("/user/:username").get(getUser)

router.route('/:id/friends').get(auth,getUserFriends)

/* UPDATE */
router.route('/:id/:friendsId').patch(auth,addRemoveFriend)


export default router;