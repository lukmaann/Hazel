import userModel from "../models/userModel.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(password);
  try {
    userModel
      .findOne({ username })
      .then((user) => {
        const userPassword = user.password;
        bcrypt
          .compare(password, userPassword)
          .then(() => {
            // ------------------if passowrd matchs create token----------
            const payload = {
              username: user.username,
              userId: user._id,
            };

            const secret = process.env.JWT_SECRET;
            const expiry = {
              expiresIn: "24h",
            };

            const token = jwt.sign(payload, secret, expiry);

            return res.status(200).send({
              msg: "login succesfull",
              username: user.username,
              token,
            });
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => res.status(404).send({ err: "User Not Found" }));
  } catch (error) {
    return res.status(500).send({ error });
  }
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
