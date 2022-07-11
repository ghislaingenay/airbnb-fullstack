const express = require('express')
const router = express.Router()

router.post("/", (req, res) => {
  if (req.isAuthenticated()){
    res.render("/bookings");
  } else {
    res.redirect("/auth/login");
  }
 res.render("profile")
})


module.exports = router