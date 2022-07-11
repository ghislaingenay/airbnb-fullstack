const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()

router.get("/", (req, res) => {
  let user = req.user
  res.redirect("/houses/list")
//   if (req.isAuthenticated()){
//     res.render("./houses/list")
// } else {
//     res.render("login")
// }
//   res.redirect("/houses/list")
})

module.exports = router