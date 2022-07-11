const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()

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
    res.render("./houses/one", {user: user})
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

router.post("/", (req, res) => {
  let user = req.user
  if (req.isAuthenticated()){
    res.render("./houses/list", {user: user})
  } else {
    res.redirect("/auth/login");
  }
})

router.patch("/:id", (req, res) => {
  let user = req.user
  if (req.isAuthenticated()){
    res.render("./houses/:id", {user: user})
  } else {
    res.redirect("/auth/login");
  }
})

router.delete("/:id", (req, res) => {
  let user = req.user
  if (req.isAuthenticated()){
    res.render("./houses/:id", {user: user})
  } else {
    res.redirect("/auth/login");
  }
})

module.exports = router