const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()

const Users = require('../models/users')
const Houses = require('../models/houses')

router.get("/", async (req, res) => {
  if (req.isAuthenticated()){
    let user = req.user
    let houses = await Houses.find({})
    res.render("houses/list", {user: user, houses: houses})
  } else {
    res.redirect("/auth/login");
  }
})
router.get("/list", async (req, res) => {
  if (req.isAuthenticated()){
    let user = req.user
    let houses = await Houses.find({})
    res.render("houses/list", {user: user, houses: houses})
  } else {
    res.redirect("/auth/login");
  }
})

router.get("/create", (req, res) => {
  if (req.isAuthenticated()){
    let user = req.user
    res.render("houses/create", {user: user})
  } else {
    res.redirect("/auth/login");
  }
})

router.get("/:id", async (req, res) => {
    let user = req.user
    let house = await Houses.findById(req.params.id).populate("host")
    console.log(house);
    res.render("houses/one", {user: user, house: house})

})

router.get("/:id/edit", (req, res) => {
  if (req.isAuthenticated()){
    let user = req.user
    res.render("houses/edit", {user: user})
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
  res.redirect("/houses/"+ house._id)
  } catch (err) {
    next(err)
  }
})

router.patch("/:id", (req, res) => {
  if (req.isAuthenticated()){
    res.render("houses/:id", {user: user})
  } else {
    res.redirect("/auth/login");
  }
})

router.delete("/:id", (req, res) => {
  if (req.isAuthenticated()){
    res.render("houses/:id", {user: user})
  } else {
    res.redirect("/auth/login");
  }
})

module.exports = router
