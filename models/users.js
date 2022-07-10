const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  avatar: String,
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    title: String,
    require: true,
  }
})

module.exports = mongoose.model("users", userSchema)