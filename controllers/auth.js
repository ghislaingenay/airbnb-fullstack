const express = require('express')
const {
  reset
} = require('nodemon')
const router = express.Router()

const Users = require('../models/users')

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
  Users.create({
    name: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.picture
  }), err => res.render("error")
})


module.exports = router