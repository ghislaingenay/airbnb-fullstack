const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: "users",
    require: true,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
  description: {
    type: String,
    require: true,
  },
  house: {
    type: ObjectId,
    ref: "houses",
    require: true,
  },
  rating: Number
})

module.exports = mongoose.model("reviews", reviewSchema)