const express = require("express"),
  routes = express.Router(),
  ArticleController = require("../controllers/article");

routes.get("/", ArticleController.get); // ? login user
routes.get("/:articleId", ArticleController.getEach); // ? login user
routes.post("/", ArticleController.create); // ? login user
routes.put("/:articleId", ArticleController.put); // ? login user
routes.delete("/:articleId", ArticleController.delete); // ? login user

module.exports = routes;
