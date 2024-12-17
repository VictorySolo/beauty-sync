const mongoose = require('mongoose')
const { Schema } = mongoose


// define regex validation pattern for email and phone
const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format
}

// Nested schema for the address
const addressSchema = new Schema({
    city: { type: String, default: '' },
    street: { type: String, default: '' },
    building: { type: String, default: '' }
})

// specialistSchema
const specialistSchema = new Schema(
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
            default: "Upload image",
            required: [true, "Image is required"],
        },
        speciality: {
            type: String,
            default: "Speciality",
            required: [true, "Speciality is required"],
            trim: true,
        },
        rating: {
            type: Number,
            default: 0.0,
            required: [true, "Rating is required"],
            min: [0, "Fees must be a positive value"],
            max: [5, "Fees must be a positive value"]
        },
        experience: {
            type: String,
            default: "About me",
            required: [true, "Experience is required"],
            trim: true,
        },
        available: {
            type: Boolean,
            default: false,
            required: [true, "Availability status is required"],
        },
        fees: {
            type: Number,
            default: 0,
            required: [true, "Fees is required"],
            min: [0, "Fees must be a positive value"],
        },
        address: {
            type: addressSchema,
            default: () => ({}),
            required: [true, "Address is required"],
        },
        date: {
            type: Number,
            // If i need a default meaning and do i need to make it required
    
        },
        slots_booked: {
            type: Object,
            default: {},
            trim: true,
        },
    }, { minimize: false }
)

const specialistModel = mongoose.model("specialist", specialistSchema)
module.exports = specialistModel

