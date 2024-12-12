const express = require('express');
const {
    registerUser,
    getUserProfile,
    updateUserProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment, } = require('../controllers/userController.js');
const {
    login,
    decodeToken,
    logout } = require('../services/authentication.js')
const upload = require('../services/multer.js');
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", login)
userRouter.post("/", decodeToken, logout)

userRouter.get("/get-profile", decodeToken, getUserProfile)
userRouter.post("/update-profile", upload.single('image'), decodeToken, updateUserProfile)
userRouter.post("/book-appointment", decodeToken, bookAppointment)
userRouter.get("/appointments", decodeToken, listAppointment)
userRouter.post("/cancel-appointment", decodeToken, cancelAppointment)

module.exports = userRouter;