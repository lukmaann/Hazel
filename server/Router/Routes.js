import { Router } from "express";
import { register } from "../controllers/appController.js";
const router = Router();

// ---------------------------------Post Routes-----------------------
router.route("/register").post(register)


router.route("/authenticate").post(); //authenticate the user
router.route("/registerMail").post(); //register the eEEmail
router.route("/login").post();  //login the user
//  ------------------------------------get routes------------------------
router.route("/genrateotp").get(); //generate the random variables
router.route("resetSession").get();//reset the variables
router.route("user/:username").get();// get the user
router.route("verifyOtp").get(); //used to verify the otp

// --------------------------------------put routes-------------------------
router.route("updateUser").put(); //Update the user
router.route("resetPassword").put(); //used to reset the user
    
// --------------------------------------put routes-------------------------

export default router;
