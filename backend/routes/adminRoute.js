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
const adminRouter = express.Router();

adminRouter.post("/login", login)
adminRouter.post("/", decodeToken, logout)

adminRouter.post("/add-specialist",decodeToken, upload.single('image'), addSpecialist)
adminRouter.get("/appointments", decodeToken, appointmentsAdmin)
adminRouter.post("/cancel-appointment", decodeToken, appointmentCancel)
adminRouter.get("/all-specialists", decodeToken, allSpecialists)
adminRouter.post("/change-availability", decodeToken, changeAvailablity)
adminRouter.get("/dashboard", decodeToken, adminDashboard)

module.exports = adminRouter;