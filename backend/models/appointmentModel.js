const mongoose = require('mongoose');
const { Schema } = mongoose


const appointmentSchema = new Schema({
    userId: { type: String, required: true },
    specId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: {
        type: Object,
        required: true
    },
    specData: {
        type: Object,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be a positive value'],
    },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
})

const appointmentModel = mongoose.model("appointment", appointmentSchema)
module.exports = appointmentModel