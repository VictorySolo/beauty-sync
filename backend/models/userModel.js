const mongoose = require('mongoose')
const { Schema } = mongoose


// define regex validation pattern for email and phone
const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format
    phone: /^05\d{8}$/, // phone number 05xxxxxxxx
}

// userSchema
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email has to be unique"],
            lowercase: true,
            trim: true,
            validate: {
                validator: (value) => validationPatterns.email.test(value),
                message: "Invalid email address.",
            },
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
            trim: true,
        },
        image: {
            type: String,
            default:"Upload image",
        },
        address: {
            type: Object,
            default: {
                city: { type: String, default: '' },
                street: { type: String, default: '' },
                building: { type: String, default: '' },
            }
        },
        gender:{
            type: String,
            enum: ["Male", "Female", "Not selected"],
            required: false,
        },
        dob:{
            type:String,
            default:"Not Selected",
        },
        phone:{
            type: String,
            default: "0500000000",
            required: [true, "Phone number is required"],
            validate: {
                validator: (value) => validationPatterns.phone.test(value),
                message: "Invalid phone number.",
            },
        },
    }
)

const userModel = mongoose.model("user", userSchema)
module.exports = userModel

