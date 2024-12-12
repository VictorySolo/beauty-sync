const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require('validator');
const User = require("../models/userModel.js");
const Specialist = require("../models/specialistModel.js");
const Appointment = require("../models/appointmentModel.js");
const { v2 : cloudinary } = require('cloudinary')


const salt_rounds = process.env.SALT_ROUNDS
const secret_key = process.env.SECRET_KEY
// API to register user
const registerUser = async (req, res) => {

    try {
       
        const { name, email, password } = req.body;
        console.log("Request Body:", req.body);

        console.log("Request Headers:", req.headers);
        // checking for all data to register user
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

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new User(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, secret_key)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// get user profile data
const getUserProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await User.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update user profile
const updateUserProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body

        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await User.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//  book appointment 
const bookAppointment = async (req, res) => {

    try {

        const { userId, specialistId, slotDate, slotTime } = req.body
        const specData = await Specialist.findById(specialistId).select("-password")

        if (!specData || !specData.available) {
            return res.status(404).json({ success: false, message: 'Specialist Not Available' })
        }

        let slots_booked = specData.slots_booked

        // checking for slot availablity 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await User.findById(userId).select("-password")

        delete specData.slots_booked
        
        const appointmentData = {
            userId,
            specialistId,
            userData,
            specData,
            amount: specData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new Appointment(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await Specialist.findByIdAndUpdate(specialistId, { slots_booked })

        res.status(201).json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }

}

//  cancel appointment
const cancelAppointment = async (req, res) => {
    try {

        const { userId, appointmentId } = req.body
        const appointmentData = await Appointment.findById(appointmentId)

        // verify appointment user 
        if (!appointmentData || appointmentData.userId !== userId) {
            return res.status(403).json({ success: false, message: 'Unauthorized action' })
        }

        await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing specialist slot 
        const { specialistId, slotDate, slotTime } = appointmentData

        const specData = await Specialist.findById(specialistId)
        if (specData && specData.slots_booked[slotDate]) {
            let slots_booked = specData.slots_booked

            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

            await Specialist.findByIdAndUpdate(specialistId, { slots_booked })
        }

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body
        const appointments = await Appointment.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}



module.exports = {
    registerUser,
    getUserProfile,
    updateUserProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
}