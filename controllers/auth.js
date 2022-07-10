const express = require('express')
const reset = require('nodemon')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10;

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
  req.logout()
  res.redirect("/auth/login")
})

router.post("/login", (req, res) => {
  //.........
})

router.post("/signup", async (req, res) => {
  await Users.findOne({
    email: req.body.email
  }, (err, founduser) => {
    if (err) {
      res.render("error")
    } else {
      if (founduser) {
        console.log('User with this email already exists')
        res.render("login")
      } else {
        let user = Users.create({
          name: req.body.fullname,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.picture
        }, err => res.render("error"))
        res.redirect("./houses/list")
      }
    }
  })
})


module.exports = router