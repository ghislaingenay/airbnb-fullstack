const express = require('express')
const router = express.Router()

const Reviews = require('../models/reviews')

router.get("/", (req, res) => {
  //.........
})

router.post("/", async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      console.log(req.body)
      req.body.author = req.user._id
      let reviewSent = await Reviews.create(req.body)
      console.log(reviewSent)
        res.redirect(`/houses/${reviewSent.house}`)
    } else {
      res.redirect("/auth/login");
    }
  } catch (err) {
    next(err);
  }
})


module.exports = router