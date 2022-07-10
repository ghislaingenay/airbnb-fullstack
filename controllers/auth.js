const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()

router.get("/", (req, res) => {
  res.redirect("./houses/list")
})

router.get("/login", (req, res) => {
   res.render("login")
})

router.get("/signup", (req, res) => {
  res.render("signup")
})

router.get("/logout", (req, res) => {
  res.redirect("login")
})

router.post("/login", (req, res) => {
  //.........
})

router.post("/signup", (req, res) => {
  //.........
})


module.exports = router