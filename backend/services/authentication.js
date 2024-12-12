//  import modules
const jwt = require("jsonwebtoken")
//  adding bcrypt for password hashing
const bcrypt = require("bcrypt")
//  extended Error class import
const HttpError = require("../services/HttpError")
//  import models
const Specialist = require("../models/specialistModel")
const User = require("../models/userModel")


//  dotenv for environment variables import
require("dotenv").config()

//  setting secret key from .env
const secretKey = process.env.SECRET_KEY

const admin_email = process.env.ADMIN_EMAIL
const admin_password = process.env.ADMIN_PASSWORD
const secret_key = process.env.SECRET_KEY
//  login function
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    //  admin login verification
    if (email === admin_email && password === admin_password) {
      return handleAdminLogin(res)
    }

    //  check for required parameters
    if (!email || !password) {
      return next(new HttpError("Email and password are required", 400))
    }

    //  find user by email
    const user = await User.findOne({ email }) || await Specialist.findOne({ email })
    if (!user) {
      return next(new HttpError("User not found", 404))
    }

    //  verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return next(new HttpError("Invalid credentials", 401))
    }
    //  store user ID in session
    req.session.userId = user._id

    //  create JWT token
    const token = jwt.sign(
      { _id: user._id },
      secretKey)
    // send response with token
    res.cookie("authToken", token, { httpOnly: true })
    res.status(200).json({ message: "Logged in successfully" })
  } catch (err) {
    console.log("Error during login", err)
    next(err)
  }
}

//  Middleware:
// check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return res.status(200).json({ loggedIn: true })
  } else {
    return next(new HttpError("Unauthorized: Please log in", 401))
  }
}

//  Decode JWT token
const decodeToken = async (req, res, next) => {
  try {
    //  getting the token from the user's cookies
    const token = req.cookies.authToken

    if (!token) {
      return next(new HttpError("No token provided", 401))
    }

    const decoded = jwt.verify(token, secretKey)
    if (token_decode !== admin_email + admin_password) {
      return res.json({ success: false, message: 'Not Authorized Login Again' })
    } else if (User) {
      req.session.userId = decoded._id;
    } else if (Specialist) {
      req.specialistId = decoded._id;
    }


    next()
  } catch (err) {
    console.error("Token decoding error:", err);
    next(new HttpError("Unauthorized: Invalid or expired token", 401))
  }
}

// -- isAdmin middleware
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }
    if (!user.isAdmin) {
      return res.status(403).json({
        message: "Forbidden: You do not have the required permissions",
      });
    }
    next();
  } catch (err) {
    console.error("Admin check error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

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

const handleAdminLogin = (res) => {
  const token = jwt.sign(email + password, secret_key)
  res.json({ success: true, token })
}
//  exporting functions
module.exports = {
  login,
  isLoggedIn,
  decodeToken,
  isAdmin,
  logout,
}
