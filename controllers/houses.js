const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()

const Users = require('../models/users')
const Houses = require('../models/houses')

router.get("/", (req, res) => {
  let user = req.user
  if (req.isAuthenticated()){
    res.render("./houses/list", {user: user})
  } else {
    res.redirect("/auth/login");
  }
})
router.get("/list", (req, res) => {
  let user = req.user
  if (req.isAuthenticated()){
    res.render("./houses/list", {user: user})
  } else {
    res.redirect("/auth/login");
  }
})


router.get("/create", (req, res) => {
  let user = req.user
  if (req.isAuthenticated()){
    res.render("./houses/create", {user: user})
  } else {
    res.redirect("/auth/login");
  }
})

router.get("/:id", (req, res) => {
  let user = req.user
  if (req.isAuthenticated()){
    let house = await Houses.findById("").populate("host")
    res.render("./houses/one", {user: user, house: house})
  } else {
    res.redirect("/auth/login");
  }
})

router.get("/:id/edit", (req, res) => {
  let user = req.user
  if (req.isAuthenticated()){
    res.render("./houses/edit", {user: user})
  } else {
    res.redirect("/auth/login");
  }
})

router.post("/", async (req, res,next) => {
  try {
  let house = await Houses.create({
    title: req.body.title,
    description: req.body.description,
    rooms: req.body.rooms,
    location: req.body.location,
    price: req.body.price,
    photos: [req.body.picture1, req.body.picture2, req.body.picture3, req.body.picture4, req.body.picture5, req.body.picture6, req.body.picture7, req.body.picture8, req.body.picture9]
  })
  res.redirect("/houses/"+house._id)
  } catch (err) {
    next(err)
  }
})

router.patch("/:id", (req, res) => {
  
})

router.delete("/:id", (req, res) => {
  
})

module.exports = router