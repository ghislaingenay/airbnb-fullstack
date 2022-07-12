const express = require('express')
const router = express.Router()
const Users = require('../models/users')

router.get("/", (req, res) => {
  if (req.isAuthenticated()){
    let user = req.user
    res.render("profile", {user: user});
  } else {
    res.redirect("/auth/login");
  }
 res.render("profile")
})

router.patch("/", (req, res) => {
  //.........
 })

module.exports = router