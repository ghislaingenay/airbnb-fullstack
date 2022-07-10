const mongoose = require('mongoose')


const houseSchema = new mongoose.Schema({
  description: {
    type: String,
    require: true,
  },
  host: {
    type: ObjectId,
    ref: "users"
  },
  location: {
    type: String,
    require: true,
  },
  photos: [String],
  price: {
    type: Number,
    require: true,
  },
  rooms: {
    type: Number,
    require: true,
  },
  title: {
    title: String,
    require: true,
  }
})

module.exports = mongoose.model("houses", houseSchema)