const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  //.........
 })

router.post("/", (req, res) => {
  if (req.isAuthenticated()){
    res.render("./houses/one")
  } else {
    res.redirect("/auth/login");
  }
})


module.exports = router