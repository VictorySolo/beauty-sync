const express = require('express');
const {
    appointmentsAdmin,
    appointmentCancel,
    addSpecialist,
    allSpecialists,
    adminDashboard } = require('../controllers/adminController.js');
const {
    login,
    decodeToken,
    logout } = require('../services/authentication.js')
const { changeAvailablity } = require('../controllers/specialistController.js');
const upload = require('../services/multer.js');
const adminRoutes = express.Router();

adminRoutes.post("/login", login)
adminRoutes.post("/", decodeToken, logout)

adminRoutes.post("/add_specialist",decodeToken, upload.single('image'), addSpecialist)
adminRoutes.get("/appointments", decodeToken, appointmentsAdmin)
adminRoutes.post("/cancel_appointment", decodeToken, appointmentCancel)
adminRoutes.get("/all_specialists", decodeToken, allSpecialists)
adminRoutes.post("/change_availability", decodeToken, changeAvailablity)
adminRoutes.get("/dashboard", decodeToken, adminDashboard)

module.exports = adminRoutes;