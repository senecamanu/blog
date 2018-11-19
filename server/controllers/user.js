const axios = require("axios"),
  jwt = require("jsonwebtoken"),
  ObjectId = require("mongodb").ObjectId,
  bcrypt = require("bcrypt"),
  User = require("../models/user"),
  Joi = require("joi"),
  Verifier = require("email-verifier"),
  PasswordComplexity = require("joi-password-complexity");

require("dotenv").config();

class UserController {
  static create(req, res) {
    let inp = req.body
    const passwordInp = inp.password
    delete inp['password']
    let jsonMessage = []
    
    // ?1. joi verify
    const schema = Joi.object()
    .keys({
      firstName: Joi.string().regex(/^[A-Za-z]+$/).min(1).max(35).required(),
      lastName: Joi.string().regex(/^[A-Za-z]+$/).min(1).max(35).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required()
    })

    Joi.validate(inp, schema, { abortEarly: false }, (err, value) => {
      err ? jsonMessage.push(err) : null

      // ?2. joi verify for password
      Joi.validate(inp.password, new PasswordComplexity(), (err, value) => {
        err ? jsonMessage.push(err) : null

        // ?3. email DNS verify
        const verifier = new Verifier(process.env.EMAIL_VERIFY_API_KEY);
    
        verifier.verify(inp.email, (err, data) => {
          if (err) jsonMessage.push(err) && console.log(err)
          else {
            if (!(data.catchAllCheck 
              && data.dnsCheck 
              && data.smtpCheck
              && data.disposableCheck)) {
              jsonMessage.push({ emailVerified: false });
            }
          }
          
          // ?4. email duplicate checker
          User.find({ email: inp.email })
            .exec((err, result) => {
              err ? jsonMessage.push(err) : null

              result.length > 0 ? 
                jsonMessage.push({ emailDuplicate: true }) : null
  
                // ?5. hash
                bcrypt.hash(passwordInp, 13, (err, hash) => {
                  !hash ? jsonMessage.push(err): console.log(hash)
  
                  // ?6. saves to DB
                  if (Object.keys(jsonMessage).length > 0) null
                  else {
                    const newUser = new User({
                      firstName: inp.firstName,
                      lastName: inp.lastName,
                      email: inp.email,
                      password: hash,
                      slaps: [],
                      articles: [],
                      saves: []
                    });

                    newUser
                      .save()
                      .then(data => {
                        console.log(data);
                        res.status(201).json({
                          message: "User successfully created",
                          data: data
                        });
                      })
                      .catch(err => res.json(err));
                  }
                })
              Object.keys(jsonMessage).length > 0 ? 
                res.status(400).json(jsonMessage) :
                null
              })
      })
      });
    });
    
    // 3. name profanity checker (gajadi, dipake buat message dbs aja)

    
  }
  
  static signIn(req, res) {
    const inp = req.body
    let errorMessage = null

    console.log(inp)

    // ?1. Find email
    User.findOne({ email: inp.email })
      .exec((err, userResult) => {

        if (!userResult) res.json({ message: "User not found" })
        else {
          // ?2. Verify password
          bcrypt.compare(inp.password, userResult.password, (err, compareResult) => {
            if (err) errorMessage = err
            else {
              console.log(compareResult)
              if (compareResult) {
                const toSign = {
                  name: `${userResult.firstName} ${userResult.lastName}`,
                  id: userResult._id
                }
  
                // ?3. JWT creation & Final Verification
                if (!errorMessage) {
                  const jwtSigned = jwt.sign(toSign, process.env.JWT_SECRET)
                  res.json({
                    jwt: jwtSigned,
                    name: toSign.name,
                    id: userResult._id
                  })
                } else {
                  res.status(400).json({
                    error: errorMessage
                  })
                }
              }
            }
          })
        }
      })
  }

  static put(req, res) {}

  static get(req, res) {
    User.find()
      // .populate("slaps")
      // .populate("articles")
      // .populate("saves")
      .exec((err, result) => {
        err ? res.json(err) : res.json(result)
      })
  }

  static getEach(req, res) {
    User.findOne({ _id: ObjectId(req.params.id) })
      .populate('articles')
      .exec((err, result) => {
        result ?
        res.json(result) :
        res.json({
          message: 'error'
        })
      })
  }

  static delete(req, res) {}
}

module.exports = UserController;