const express = require("express"),
  routes = express.Router(),
  CommentController = require("../controllers/comment");

routes.post("/", CommentController.create); // ? creates a new comment
routes.put("/", CommentController.put); // ? creates a new comment
routes.delete("/", CommentController.delete); // ? deletes a comment
routes.get('/', CommentController.get) // ? finds all comments from a post
routes.get('/:token', CommentController.getEach) // ? finds all comments from a user

module.exports = routes;
