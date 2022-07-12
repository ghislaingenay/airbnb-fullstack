const express = require('express')
const reset = require('nodemon')
const router = express.Router()
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

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
    let user = await Users.findOne({
      email: req.body.loginemail
    })
    if (user) {
      await bcrypt.compare(req.body.loginpassword, user.password, (err, result) => {
        if (result === true) {
          req.login(user, err => {
            if(err) {throw err} else {res.render("./houses/list")}
          })
        } else {
          res.send("The password is wrong");
        }
      })
    } else {
      throw new Error("No user found in the database")
    }
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
    let hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash
    let createUser = await Users.create(req.body)
    req.login(createUser, err => {
      if (err) {throw err} else {res.redirect('/houses/list')}

    })
    res.redirect("/houses/list")
  } catch (err) {
    next(err)
  }
})



module.exports = router