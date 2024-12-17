require("dotenv").config()
//  import modules
const jwt = require("jsonwebtoken")
//  adding bcrypt for password hashing
const bcrypt = require("bcrypt")
//  extended Error class import
const HttpError = require("../services/HttpError")
//  import models
const Specialist = require("../models/specialistModel")
const User = require("../models/userModel")


const secret_key = process.env.SECRET_KEY

const admin_email = process.env.ADMIN_EMAIL
const admin_password = process.env.ADMIN_PASSWORD

//  login function
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    //  check for required parameters
    if (!email || !password) {
      return next(new HttpError("Email and password are required", 400))
    }

    let userRole = null;
    let user = null;

    //  admin login verification
    if (email === admin_email && password === admin_password) {
      userRole = "admin";
      user = { _id: "admin", email: admin_email, role: userRole };
    } else {
    // User or Specialist login verification
     user = await User.findOne({ email }) || await Specialist.findOne({ email })
     if (!user) {
       return next(new HttpError("User not found", 404))
     }

     //  verify password
     const isPasswordValid = await bcrypt.compare(password, user.password)
     if (!isPasswordValid) {
       return next(new HttpError("Invalid credentials", 401))
     }

     // Determine user type
     userRole = user instanceof User ? "user" : "specialist";
    }
    
    if (!secret_key) {
      console.error("Secret key not defined!");
      return res.status(500).json({ message: "Internal Server Error: No Secret Key" });
    }
    //  store user ID in session
    req.session.userId = user._id

    // Create a JWT token with user information
    const payload = userRole === "admin" 
      ? { role: "admin" }
      : { _id: user._id, role: userRole };

    //  create JWT token
    const token = jwt.sign(payload, secret_key, { expiresIn: "7d" })
    // send response with token
    res.cookie("authToken", token, { httpOnly: true, secure: true, sameSite: "strict" })
    res.status(200).json({ 
      message: "Logged in successfully",
      role: userRole,
      token,
     })
  } catch (err) {
    console.log("Error during login", err)
    next(err)
  }
}

//  Middleware:
// check if user is logged in
const isLoggedIn = (req, res, next) => {
  const token = req.cookies.authToken
  if (!token){
    return next(new HttpError("Unauthorized: Please log in", 401))
  } 
  try{
    const decoded = jwt.verify(token, secret_key)
    req.user = decoded
    next()
  } catch(err){
    console.log("Token verification error:", err)
    next(new HttpError("Unauthorized: Invalid or expired token", 401))
  }   
}

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return next(new HttpError("Forbidden: You do not have the required permissions", 403));
  }
  next();
};

//  Decode JWT token
const decodeToken = async (req, res, next) => {
    const token = req.cookies.authToken

    if (!token) {
      return next(new HttpError("No token provided", 401))
    }
    try{
      const decoded = jwt.verify(token, secret_key)
      if(decoded.role === "admin"){
        req.isAdmin = true
      } else{
        req.userId = decoded._id
        req.userRole = decoded.role
      }
      next()
    } catch (err){
      console.error("Token decoding error:", err)
      next(new HttpError("Unauthorized: Invalid or expired token", 401))     
    } 
}

//  logout function
const logout = (req, res, next) => {
  //  destroying the session
  req.session.destroy((err) => {
    if (err) {
      return next(new HttpError("Error logging out", 500))
    }
    //  clear the cookie "authToken"
    res.clearCookie("authToken", { httpOnly: true, secure: true, sameSite: "strict" })
    //  sending response to the user with success logout message
    res.status(200).json({ message: "Logged out successfully" })
  })
}

//  exporting functions
module.exports = {
  login,
  isLoggedIn,
  decodeToken,
  isAdmin,
  logout,
}
