const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Houses = require('../models/houses')


router.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user
    let selectedHouses = await Houses.find({
      host: req.user._id
    })
    res.render("profile", {
      user: user,
      houses: selectedHouses
    })
  } else {
    res.redirect("/auth/login");
  }
})

router.patch("/", async (req, res, next) => {
  try {
    let foundUser = Users.findOne({
      email: req.body.email
    })
    if (req.body.email === foundUser.email) {
      throw new Error("This email is already taken")
    } else {
    let updatedUser = await Users.findOneAndUpdate({
      email: req.body.email
    }, req.body, {
      new: true
    })
    let UserHouses = await Houses.find({host: updatedUser._id})
    res.redirect("profile", {
          user: updatedUser
        })
    req.logout()
    req.login(updatedUser, err => {
      if (err) {
        throw err
      } else {
        res.redirect("profile", {
          user: updatedUser,
          houses: UserHouses
        })
      }
    })
  } catch (err) {
    next(err)
  }
})


module.exports = router