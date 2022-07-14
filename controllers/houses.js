const express = require('express')
const {
  reset
} = require('nodemon')
const router = express.Router()

const Users = require('../models/users')
const Houses = require('../models/houses')
const Bookings = require('../models/bookings')

// Function which take one object and return only the key which have a value
const cleanEmptyField = (object) => {
  for (let key in object) {
    if (object[key] === "") {
      delete object[key]
    }
  }
  delete object.sortprice
  return object
}


router.get("/", async (req, res, next) => {
  try {

      let sorting = req.query.sortprice
      let user = req.user
      let q = cleanEmptyField(req.query)
      if (q.price) {
        q.price = {
          $lte: req.query.price
        }
      }
      if (q.title) {
        let reg = new RegExp(q.title)
        q.title = {
          $regex: reg,
          $options: "gi"
        }
      }

      let filteredHouses = await Houses.find({})

      // Sort depending on price sort input
      if (sorting == "lowtohigh") {
         filteredHouses = await Houses.find(q).sort("price")
      } else {
       filteredHouses = await Houses.find(q).sort("-price")
      }

      if (filteredHouses.length == 0) {
        throw new Error("No property were found in the DB")
      }

      res.render("houses/list", {
        user: user,
        houses: filteredHouses,
        query: q
      })

  } catch (err) {
    next(err)
  }
})


router.get("/list", async (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user
    let houses = await Houses.find({})
    res.render("houses/list", {
      user: user,
      houses: houses
    })
  } else {
    res.redirect("/auth/login");
  }
})

router.get("/create", (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user
    res.render("houses/create", {
      user: user
    })
  } else {
    res.redirect("/auth/login");
  }
})

router.get("/:id", async (req, res) => {
  let user = req.user
  let house = await Houses.findById(req.params.id).populate("host")
  let bookingsFound = await Bookings.find({house: req.params.id, author: user})
  if (bookingsFound) {
    res.render("houses/one", {
      user: user,
      house: house,
      booking: bookingsFound,
    })
  }
  res.render("houses/one", {
    user: user,
    house: house
  })

})

router.get("/:id/edit", async (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user
    let houseId = await Houses.findById(req.params.id)
    res.render("houses/edit", {
      user: user,
      housed: houseId

    })
  } else {
    res.redirect("/auth/login");
  }
})

router.post("/", async (req, res, next) => {
  try {
    let house = await Houses.create({
      title: req.body.title,
      description: req.body.description,
      rooms: req.body.rooms,
      location: req.body.location,
      price: req.body.price,
      photos: [req.body.picture1, req.body.picture2, req.body.picture3, req.body.picture4, req.body.picture5, req.body.picture6, req.body.picture7, req.body.picture8, req.body.picture9]
    })
    res.redirect("/houses/" + house._id)
  } catch (err) {
    next(err)
  }
})

router.patch("/:id", async (req, res, next) => {
  // if (req.isAuthenticated()) {
  try {
      let updatedHouse = await Houses.findByIdAndUpdate(
        req.params.id, req.body, {
        new: true
      })
      console.log(updatedHouse)
      let user = req.user
      req.logout()
      
      req.login(user, err => {
        if (err) {
          throw err
        } else {
          res.redirect(`/houses/${updatedHouse._id}`)
        }
      })
    
  } catch (err) {
    next(err)
  }

})




router.delete("/:id", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("houses/:id", {
      user: user
    })
  } else {
    res.redirect("/auth/login");
  }
})

module.exports = router