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
  try {
    await Users.findOne({
      email: req.body.loginemail
    }, (err, foundUser) => {
      if (foundUser) {
        bcrypt.compare(req.body.loginpassword, foundUser.password, (err, result) => {
          if (result === true) {
            res.redirect("/")
          } else {
            res.send("err")
          }
        })
      }
    })
  } catch (err) {
    next(err)
  }
})

router.post("/signup", async (req, res, next) => {
  try {
    let user = await Users.findOne({
      email: req.body.email
    })
    if (user) {
      throw new Error("The user is already registered")
    }
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash
    let createUser = await Users.create({
      avatar: req.body.picture,
      email: req.body.email,
      name: req.body.fullname,
      password: req.body.password
    })
    req.login(createUser, loginError => {
        res.redirect('/houses/list');
    })
    res.redirect("/houses/list")
  } catch (err) {
    next(err)
  }
})



module.exports = router