const mongoose = require('mongoose')


const bookingSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  house: {
    type: ObjectId,
    ref: "houses",
    required: true,
  },
  rating: Number
})

module.exports = mongoose.model("bookings", bookingSchema)