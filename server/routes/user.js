const express = require('express'),
  routes = express.Router(),
  UserController = require('../controllers/user')

routes.post('/', UserController.create) // ? makes new user
routes.post("/signin", UserController.signIn); // ? login user
routes.put("/", UserController.put); // ? login user
routes.get("/", UserController.get); // ? login user
routes.get("/:id", UserController.getEach); // ? gets user by ID (gajuga sih, dari access_token baru ke ID)
routes.delete("/", UserController.delete); // ? login user


module.exports = routes