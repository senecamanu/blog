const axios = require('axios'),
  jwt = require('jsonwebtoken'),
  ObjectId = require('mongodb').ObjectId,
  crypto = require('crypto'),
  bcrypt = require('bcryptjs'),
  Article = require('../models/article'),
  User = require('../models/user')

require("dotenv").config();

class ArticleController {
  static create(req, res) { 
    const inp = req.body
    console.log(inp.title);
    console.log(inp.heading);
    console.log(inp.content)

    // ?1. token verify
    jwt.verify(req.headers.access_token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) console.log(err)
      else {
        // ?2. creates blog post
        console.log(inp.image)
        const newArticle = new Article({
          title: inp.title,
          heading: inp.heading,
          content: inp.content,
          userId: decoded.id,
          image: inp.image,
          comment: [],
          slaps: [],
          createdAt: inp.createdAt
        })

        // ?3. add to user's list of articles
        newArticle.save()
          .then(data => {
            User.update({ _id: ObjectId(decoded.id) },
            {$push: {articles: ObjectId(data._id)}},
            (err, result) => {

              // ?4. add custom error and success json message
              err ? console.log(err) : console.log(result)
            })
          })
          .catch(err => console.log(err))
      }
    })
  }

  static put(req, res) { 
    const inp = req.body
    console.log(req.params.articleId);
    console.log('^ ini yang lo request?')

    Article.findByIdAndUpdate(req.params.articleId, { $set: req.body }, function (err, result) {
      if (err) return handleError(err);
      res.json(result)
    });
  }

  static get(req, res) { 
    Article.find()
      .then(data => res.json(data))
      .catch(err => res.json(err))

  }

  static getEach(req, res) {
    console.log(req.params.articleId)
    Article.findOne({ _id: ObjectId(req.params.articleId) })
      .populate({
        path: 'comments',
        populate: {path: 'userId'}
      })
      .then(data => {
        console.log(data)
        res.json(data)
      })
      .catch(err => res.json(err))
  }

  static delete(req, res) { 
    
    Article.findByIdAndRemove(ObjectId(req.params.articleId))
      .then(result => {
        console.log(result);
        res.json(result)
      })
      .catch(err => {
        console.log(err)
        res.json(err)
      })
  }
}

module.exports = ArticleController;