const express = require('express')
const reset = require('nodemon')
const router = express.Router()
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

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

router.post("/login", async (req, res, next) => {
    await Users.findOne({
      email: req.body.loginemail
  }, (err, foundUser) => {
    if (foundUser) {
      res.send("found user")
  }else {
    res.send("err")
  }})
})

router.post("/signup", async (req, res) => {
  await Users.findOne({
    email: req.body.email
  }, (err, foundUser) => {
    if (err) {
      res.render("error")
    } else {
      if (foundUser) {
        res.render("error")
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            let user = Users.create({
              name: req.body.fullname,
              email: req.body.email,
              password: hash,
              avatar: req.body.picture
            }, err => res.render("error"))
            // req.login(user, (err) => {
            //   if (err) { throw err }})
            res.redirect("/houses/list"), err => res.render("error")
          })
        });
      }
    }
  });
})


module.exports = router