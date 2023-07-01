import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const user = (req.user = decodedToken);

    // res.json(decodedToken);
    next();
  } catch (error) {
    res.status(401).json({ err: "Unauthorised User" });
  }
};

export const localVariables = async (req, res, next) => {
  req.app.locals = {
    Otp: null,
    resetSession: false,
  };
  next();
};

export default auth;
