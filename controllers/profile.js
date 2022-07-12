const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Houses = require('../models/houses')


router.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    let selectedHouses = await Houses.find({
      host: req.user.name
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
      }, {
        name: req.body.prfname,
        email: req.body.prfemail,
        picture: req.body.newavatar,
      })
      res.redirect("profile", {
        user: updatedUser
      })
    }
  } catch (err) {
    next(err)
  }

})


module.exports = router