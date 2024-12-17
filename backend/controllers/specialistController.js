const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
const validator = require('validator');
const Specialist = require("../models/specialistModel")
const Appointment = require("../models/appointmentModel")
const { v2: cloudinary } = require("cloudinary");


const salt_rounds = process.env.SALT_ROUNDS
const secret_key = process.env.SECRET_KEY

// API to register user
const registerSpecialist = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // checking for all data to register account
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }
        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(parseInt(salt_rounds, 10))
        const hashedPassword = await bcrypt.hash(password, salt)

        const specialistData = {
            name,
            email,
            password: hashedPassword,
        }

        const newSpec = new Specialist(specialistData)
        const specialist = await newSpec.save()

         // Ensure secret_key is valid
         const secret_key = process.env.SECRET_KEY;
         if (!secret_key) {
             return res.json({ success: false, message: "Secret key is not defined" });
         }

        const token = jwt.sign({ id: specialist._id }, secret_key)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// Get Specialist Profile
const getSpecialistProfile = async (req, res) => {
    try {
        const { specId } = req.body;
        const specData = await Specialist.findById(specId).select(
            "-password"
        );

        res.json({ success: true, specData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

//  update specialist profile data from  specialist Panel
const updateSpecProfile = async (req, res) => {
    try {

        const { specId, name, phone, address, experience, fees, available } = req.body

        if (!name || !phone || !address || !experience || !fees || available) {
            return res.json({ success: false, message: "Missing Details" });
        }

        await Specialist.findByIdAndUpdate(specId,
            {
                name,
                phone,
                address,
                experience,
                fees,
                available
            })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await Specialist.findByIdAndUpdate(specId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//  get specialist appointments for personal panel
const appointmentsToSpec = async (req, res) => {
    try {

        const { specId } = req.body
        const appointments = await Appointment.find({ specId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//  cancel appointment for personal panel
const appointmentCancel = async (req, res) => {
    try {

        const { specId, appointmentId } = req.body

        const appointmentData = await Appointment.findById(appointmentId)
        if (appointmentData && appointmentData.specId === specId) {
            await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//  mark appointment completed for specialist panel
const appointmentComplete = async (req, res) => {
    try {

        const { specId, appointmentId } = req.body

        const appointmentData = await Appointment.findById(appointmentId)
        if (appointmentData && appointmentData.specId === specId) {
            await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//  get all specialists list for Frontend
const specialistList = async (req, res) => {
    try {

        const specialists = await Specialist.find({})

        res.json({ 
            success: true,
            specialists: specialists.length > 0 ? specialists : [], 

         })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// change specialist availablity for Admin and specialist Panel
const changeAvailablity = async (req, res) => {
    try {

        const { specId } = req.body

        const specialistData = await Specialist.findById(specId)
        await Specialist.findByIdAndUpdate(specId, { available: !specialistData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//  get dashboard data for specialist panel
const specialistDashboard = async (req, res) => {
    try {

        const { specId } = req.body

        const appointments = await Appointment.find({ specId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let clients = []

        appointments.map((item) => {
            if (!clients.includes(item.userId)) {
                clients.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            appointments: appointments.length,
            clients: clients.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

module.exports = {
    registerSpecialist,
    getSpecialistProfile,
    updateSpecProfile,
    appointmentsToSpec,
    appointmentCancel,
    specialistList,
    changeAvailablity,
    appointmentComplete,
    specialistDashboard,
}

