const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  res.redirect("houses")
})

router.get("/login", (req, res) => {
   //.........
})

router.get("/signup", (req, res) => {
  //.........
})

router.get("/logout", (req, res) => {
  //.........
})

router.post("/login", (req, res) => {
  //.........
})

router.post("/signup", (req, res) => {
  //.........
})


module.exports = router