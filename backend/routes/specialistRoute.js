const express = require('express');
const {
    registerSpecialist,
    getSpecialistProfile,
    updateSpecProfile,
    appointmentsToSpec,
    appointmentCancel,
    specialistList,
    changeAvailablity,
    appointmentComplete,
    specialistDashboard,
} = require('../controllers/specialistController.js');
const {
    login,
    decodeToken,
 } = require('../services/authentication.js')
const specialistRoutes = express.Router();

specialistRoutes.post("/register", registerSpecialist);
specialistRoutes.post("/login", login)
// specialistRoutes.post("/", decodeToken, logout)
specialistRoutes.post("/cancel_appointment", decodeToken, appointmentCancel)
specialistRoutes.get("/appointments", decodeToken, appointmentsToSpec)
specialistRoutes.get("/list", specialistList)
specialistRoutes.post("/change_availability", decodeToken, changeAvailablity)
specialistRoutes.post("/complete_appointment", decodeToken, appointmentComplete)
specialistRoutes.get("/dashboard", decodeToken, specialistDashboard)
specialistRoutes.get("/profile", decodeToken, getSpecialistProfile)
specialistRoutes.post("/update_profile", decodeToken, updateSpecProfile)



module.exports = specialistRoutes