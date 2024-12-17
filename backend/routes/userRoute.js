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
} = require('../services/authentication.js')
const upload = require('../services/multer.js');
const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", login)
// userRoutes.post("/", decodeToken, logout)

userRoutes.get("/get_profile", decodeToken, getUserProfile)
userRoutes.post("/update_profile", upload.single('image'), decodeToken, updateUserProfile)
userRoutes.post("/book_appointment", decodeToken, bookAppointment)
userRoutes.get("/appointments", decodeToken, listAppointment)
userRoutes.post("/cancel_appointment", decodeToken, cancelAppointment)

module.exports = userRoutes;