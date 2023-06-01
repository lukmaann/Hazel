import userModel from "../models/userModel.js";

//---------------register user------------------
export const register=async (req,res)=>{
  try {
    const {username,password,email,profile}=req.body;
    
    // -----------check the user exists in db-----------
  const finduser=await userModel.findOne({username}).then((user)=>{
    if(!user) res.send("not a user")
   })
   
  
  

    existUser.then(data=>res.send(data)).catch(err=>res.send(err))
    


  } catch (error) {
    res.status(500).send({err:error})
  }

}

// --------------------login---------------------
export const login = async (req, res) => {
  res.json("login Route");
};

// --------------------------generate OTP--------------

export const generateOTP = async (req, res) => {
  res.json("genrate otp route");
};

// -----------------------------verify OTP---------------

export const verifyOTP = async (req, res) => {
  res.json("verify OTP");
};

// --------------------------------getUser----------------

export const getUser = async (req, res) => {
  res.json("get User Route");
};

// -------------------------------updateUser-------------

export const updateUser = async (req, res) => {
  res.json("update User Route");
};

// -----------------------------redirect user to reset password when otp is correct

export const createResetSession = async (Req, res) => {
  res.json("create reset Route");
};

// --------------------------------------resetPassword----------------------
export const resetPassword = async (req, res) => {
  res.json("reset password route");
};
