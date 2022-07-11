const express = require('express')
const router = express.Router()
const Users = require('../models/users')

router.get("/", (req, res) => {
  let user = req.user
  if (req.isAuthenticated()){
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