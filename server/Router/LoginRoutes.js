import { Router } from "express";
import * as controller from "../controllers/appController.js";
import auth, {localVariables} from "../middlewre/auth.js";
import { registerMail } from "../controllers/mailer.js";

const router = Router();

// ---------------------------------Post Routes-----------------------
router.route("/register").post(controller.register)


router.route("/authenticate").post(controller.verifyUser,(req,res)=>res.end("ended task")); //authenticate the user
router.route("/registerMail").post(registerMail); //register the email
router.route("/login").post(controller.verifyUser,controller.login);  //login the user
router.route('/adminlogin').post(controller.adminLogin);
//  ------------------------------------get routes------------------------
router.route("/genrateotp").get(controller.verifyUser,localVariables,controller.generateOTP); //generate the random variables
router.route("/resetSession").get(controller.createResetSession);//reset the variables
router.route("/user/:username").get(controller.getUser);// get the user
router.route("/verifyOtp").get(controller.verifyOTP,controller.verifyOTP); //used to verify the otp

// --------------------------------------put routes-------------------------
router.route("/updateUser").put(auth,controller.updateUser); //Update the user
router.route("/resetPassword").put(controller.verifyUser,controller.resetPassword); //used to reset the user
    
// --------------------------------------put routes-------------------------

export default router;
