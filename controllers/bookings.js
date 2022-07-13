const express = require('express')
const router = express.Router()
const moment = require('moment')
const Bookings = require('../models/bookings')

router.post("/", async (req, res, next) => {
  try {
    let user = req.user
    if (req.isAuthenticated()) {
      let newBooking = await Bookings.create({
        author: user,
        house: req.body.house,
        description: req.body.description,
      })
      res.redirect(`/houses/${req.body.house}`)
    } else {
      res.redirect("/auth/login");
    }
  } catch (err) {
    next(err);
  }
})


module.exports = router