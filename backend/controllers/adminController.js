const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Specialist = require("../models/specialistModel.js");
const Appointment = require("../models/appointmentModel.js");
const User = require("../models/userModel.js");
const { v2: cloudinary } = require('cloudinary');

const salt_rounds = process.env.SALT_ROUNDS

//  get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await Appointment.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//  appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for adding specialist
const addSpecialist = async (req, res) => {

    try {

        const { name, email, password, speciality, rating, experience, about, fees, address } = req.body

        // checking for all data to add specialist
        if (!name || !email || !password || !speciality || !rating || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        
        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(parseInt(salt_rounds, 10))
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const specialistData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            rating,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newspecialist = new Specialist(specialistData)
        await newspecialist.save()
        res.json({ success: true, message: 'specialist Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//  get all specialists list for admin panel
const allSpecialists = async (req, res) => {
    try {

        const specialists = await Specialist.find({}).select('-password')
        res.json({ success: true, specialists })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//  get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const specialists = await Specialist.find({})
        const users = await User.find({})
        const appointments = await Appointment.find({})

        const dashData = {
            specialists: specialists.length,
            appointments: appointments.length,
            clients: users.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

module.exports = {
    appointmentsAdmin,
    appointmentCancel,
    addSpecialist,
    allSpecialists,
    adminDashboard
}
