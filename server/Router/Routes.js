import { Router } from "express";
const router= Router()

router.route("/register").post((req,res)=>{

    res.json("register Route")

})


export default router;