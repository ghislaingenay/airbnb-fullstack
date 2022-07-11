const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()

router.get("/", (req, res) => {
  if (req.isAuthenticated()){
    res.render("./houses/list")
  } else {
    res.redirect("/auth/login");
  }
})
router.get("/list", (req, res) => {
  if (req.isAuthenticated()){
    res.render("./houses/list")
  } else {
    res.redirect("/auth/login");
  }
})


router.get("/create", (req, res) => {
  if (req.isAuthenticated()){
    res.render("./houses/create")
  } else {
    res.redirect("/auth/login");
  }
})

router.get("/:id", (req, res) => {
  res.render("./houses/one")
})

router.get("/:id/edit", (req, res) => {
  if (req.isAuthenticated()){
    res.render("./houses/edit")
  } else {
    res.redirect("/auth/login");
  }
})

router.post("/", (req, res) => {
  if (req.isAuthenticated()){
    res.render("./houses/list")
  } else {
    res.redirect("/auth/login");
  }
})

router.patch("/:id", (req, res) => {
  if (req.isAuthenticated()){
    res.render("./houses/:id")
  } else {
    res.redirect("/auth/login");
  }
})

router.delete("/:id", (req, res) => {
  if (req.isAuthenticated()){
    res.render("./houses/:id")
  } else {
    res.redirect("/auth/login");
  }
})

module.exports = router