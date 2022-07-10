const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()

router.get("/", (req, res) => {
  res.redirect("houses")
})

module.exports = router