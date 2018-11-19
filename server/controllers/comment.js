const axios = require("axios"),
  jwt = require("jsonwebtoken"),
  ObjectId = require("mongodb").ObjectId,
  crypto = require("crypto"),
  bcrypt = require("bcryptjs"),
  Comment = require("../models/comment"),
  Article = require('../models/article');

require("dotenv").config();

class CommentController {

  // Create
  static create(req, res) {
    const inp = req.body;
    const newComment = new Comment({
      userId: req.body.userId,
      articleId: req.body.articleId,
      comment: req.body.comment,
      timestamp: req.body.timestamp
    })
    
    newComment.save()
      .then(data => {
        Article.update({ _id: ObjectId(inp.articleId) },
          { $push: { comments: ObjectId(data._id) } },
          (err, result) => {

            // ?4. add custom error and success json message
            // err ? console.log(err) : console.log(result)
            if (err) {
              console.log(err)
              res.json(err)
            } else {
              console.log(result)
              res.json(result)
            }
          })
      })
      .catch(err => console.log(err))
  }

  static put(req, res) {}

  static get(req, res) {}

  static getEach(req, res) {}

  static delete(req, res) {
    const inp = req.body
    Comment.deleteOne({ _id: ObjectId(inp.id) }, (err, response) => {
      if (err) {
        console.log(err)
        res.json(err)
      } 
      else {
        console.log(response)
        res.json(response)
      }
    })
  }
}

module.exports = CommentController;
