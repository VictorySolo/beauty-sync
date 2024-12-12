const express = require('express');
const {
    registerSpecialist,
    appointmentsToSpec,
    appointmentCancel,
    specialistList,
    changeAvailablity,
    appointmentComplete,
    dashboard,
    specialistProfile,
    updateSpecProfile } = require('../controllers/specialistController.js');
const {
    login,
    decodeToken,
    logout } = require('../services/authentication.js')
const specialistRouter = express.Router();

specialistRouter.post("/sign_up", registerSpecialist);
specialistRouter.post("/login", login)
specialistRouter.post("/", decodeToken, logout)

specialistRouter.post("/cancel-appointment", decodeToken, appointmentCancel)
specialistRouter.get("/appointments", decodeToken, appointmentsToSpec)
specialistRouter.get("/list", specialistList)
specialistRouter.post("/change-availability", decodeToken, changeAvailablity)
specialistRouter.post("/complete-appointment", decodeToken, appointmentComplete)
specialistRouter.get("/dashboard", decodeToken, dashboard)
specialistRouter.get("/profile", decodeToken, specialistProfile)
specialistRouter.post("/update-profile", decodeToken, updateSpecProfile)



module.exports = specialistRouter