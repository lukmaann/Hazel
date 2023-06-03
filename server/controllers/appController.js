import userModel from "../models/userModel.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

// ------------------------------verify user---------------------

export const verifyUser = async (req, res, next) => {
  const { username } = req.method == "GET" ? req.query : req.body;
  try {
    const userExists = await userModel.findOne({ username });
    if (!userExists) {
      return res.status(404).send({ err: "User Not Found!!" });
    }
    next();
  } catch (error) {
    return res.status(404).send({ err: "Authentication Error" });
  }
};

//---------------register user------------------
export const register = async (req, res) => {
  try {
    const { username, password, email, profile } = req.body;

    // -----------check the user exists in db-----------
    const existsUser = new Promise((resolve, reject) => {
      userModel
        .findOne({ username })
        .then((user) => {
          if (user) reject(new Error("username already exists"));
          resolve();
        })
        .catch((err) => {
          reject("error");
        });
    });

    const existsEmail = new Promise((resolve, reject) => {
      userModel
        .findOne({ email })
        .then((email) => {
          if (email) reject(new Error("email already exists"));
          resolve();
        })
        .catch((err) => {
          reject("error");
        });
    });

    Promise.all([existsEmail, existsUser])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new userModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
              });

              user
                .save()
                .then(() => res.status(201).send("user saved"))
                .catch((err) => res.status(500).send(err));
            })
            .catch((err) => {
              return res.status(500).send({ err: "unable to hash password" });
            });
        }
      })
      .catch((err) => {
        res.send({ errors: err });
      });
  } catch (error) {
    res.status(500).send({ err: error });
  }
};

// --------------------login---------------------
export const login=async (req,res)=>{
  const {username,password}=req.body;
  try {
    userModel.findOne({username}).then((user)=>{
      bcrypt.compare(password,user.password).then((match)=>{
        if(!match) res.status(400).send({err:"Invalid password"});
        // --------------------create token------------------------
        const payload={
          userId:user._id,
          username:user.username
        }
        const secret=process.env.JWT_SECRET;
        const expiry={
          expiresIn:"24h"
        }

        const token=jwt.sign(payload,secret,expiry);

      return res.status(200).send({
          msg:"Login Succefull",
          username:user.username,
          token
        })
      }).catch((err)=>res.status(400).send(err))
     

    }).catch((err)=>{res.status(404).send({err:"User Not Found"})})
  } catch (error) {
    res.status(500).send({err:"login error"})
  }
}

// --------------------------generate OTP--------------

export const generateOTP = async (req, res) => {
  req.app.locals.Otp= await otpGenerator.generate(6,{specialChars:false,upperCaseAlphabets:false,lowerCaseAlphabets:false});
  res.status(201).send({code:req.app.locals.Otp})
};

// -----------------------------verify OTP---------------

export const verifyOTP = async (req, res) => {
 const {code}=req.query;
 if(parseInt(code)===parseInt(req.app.locals.Otp)){
  res.send("matched");
 }else{
  res.send("not matched")
 }
};

// --------------------------------getUser----------------

export const getUser = async (req, res) => {
  const {username} =req.params;
  try {
    if(!username) return res.status(501).send("Invalid username");
    
    userModel.findOne({username}).then((user)=>{
      if(!user) return res.status(501).send("cannot find user");

      const { password , ...rest}=Object.assign({},user.toJSON());
      res.status(200).send(rest)
    }).catch((err)=>{res.status(500).send(err)})
  } catch (error) {
    return res.status(501).send("connot find user")
  }
};

// -------------------------------updateUser-------------

export const updateUser = async (req, res) => {
  const {userId}=req.user;
  console.log(userId)
  try {
    if(userId){
      console.log(userId);
      const body=req.body;
      userModel.updateOne({_id:userId},body).then(()=>{
        res.status(201).send("record updated")
      }).catch((err)=>res.status(201).send("cant update user"))

    }else{
      return res.status(401).send({err:"user not Found"})
    }
  } catch (error) {
    return res.status(401).send({err:"user not Found"})
  }
};

// -----------------------------redirect user to reset password when otp is correct

export const createResetSession = async (Req, res) => {
  res.json("create reset Route");
};

// --------------------------------------resetPassword----------------------
export const resetPassword = async (req, res) => {
  res.json("reset password route");
};
