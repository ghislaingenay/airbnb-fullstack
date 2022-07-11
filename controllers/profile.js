const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  if (req.isAuthenticated()){
    res.render("profile");
  } else {
    res.redirect("/auth/login");
  }
 res.render("profile")
})

router.patch("/", (req, res) => {
  //.........
 })

module.exports = router