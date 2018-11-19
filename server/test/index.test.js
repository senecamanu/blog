const chai = require("chai"),
      chaiHttp = require("chai-http"),
      expect = chai.expect,
      jwt = require('jsonwebtoken');

chai.use(chaiHttp)

// ! R = route, C = condition

describe('User API', function() {

  // R1
  describe('/user POST', function() {

    beforeEach((done) => {
      // empty database
    })

    // C1
    it("201 + a new user", function(done) {
      const data = {
        name: 'Seneca Manu',
        email: 'senecamanu.a@gmail.com',
        password: '19099He!'
      }
  
      chai.request(app)
        .post('/user')
        .type('form')
        .send(data)
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("data");
          expect(res.body.message).to.equal("User successfully created");
          expect(res.body.data.name).to.equal(data.name);
          expect(res.body.data.email).to.equal(data.email);
          done()
        })
    })
  
    // C2 (ERR)
    it("400 + incorrect name", function(done) {
      const data = {
        name: 's13Mnes!!!',
        email: 'senecamanu.a@gmail.com',
        password: '19099He!'
      }
  
      chai.request(app)
        .post('/user')
        .type('form')
        .send(data)
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("data");
          expect(res.body.message).to.equal("Incorrect name");
          expect(res.body.data.name).to.equal(data.name);
          done()
        })
    })
  
    // C3 (ERR)
    it("400 + incorrect email", function(done) {
      const data = {
        name: 'Seneca Manu',
        email: 'senecamanu.a@.com',
        password: '19099He!'
      }
  
      chai.request(app)
        .post('/user')
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("data");
          expect(res.body.message).to.equal("Incorrect email");
          expect(res.body.data.email).to.equal(data.email);
          done()
        })
    })
  
    // C4 (ERR)
    it("400 + incorrect email", function (done) {
      const data = {
        name: 'Seneca Manu',
        email: 'senecamanu.a@gmail.com',
        password: '19099He!'
      }
  
      chai.request(app)
        .post('/user')
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("data");
          expect(res.body.message).to.equal("Duplicate email");
          expect(res.body.data.email).to.equal(data.email);
          done()
        })
    })
  })

  // R2
  describe('/user/s POST', function() {
    
    // C1
    it("200 + User verified", function(done) {
      const data = {
        email: 'senecamanu.a@gmail.com',
        password: '19099He!'
      }

      chai.request(app)
        .post('/user/s')
        .type('form')
        .send(data)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("data");
          expect(res.body.message).to.equal("User verified");
          expect(res.body.data).to.have.property(jwt);
          // decode jwt, cek payload sesuai atau tidak
          expect(res.body.data).to.have.property(name);
          done();
        })
    })

    // C2
    it("400 + Data does not match", function (done) {
      const data = {
        email: 'senecanu.a@gmail.com',
        password: '199He!'
      }

      chai.request(app)
        .post('/user/s')
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Data does not match");
          done();
        })
    })
  })

  // R3
  describe("/post POST", function() {

    // C1
    it("201 + Blog post successfully created", function(done) {
      const data = {
        title: 'Aeon',
        content: 'contents are not not available at the moment'
      }

      chai.request(app)
        .post('/post')
        .set('access_token', 'insertaccesstokenhere') //! INSERT ACCESS TOKEN HERE ONCE MADE
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Blog post successfully created");
          done();
        })
    })

    // C2
    it("400 + Empty title", function (done) {
      const data = {
        title: '',
        content: 'contents are not not available at the moment'
      }

      chai.request(app)
        .post('/post')
        .set('access_token', 'insertaccesstokenhere') //! INSERT ACCESS TOKEN HERE ONCE MADE
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Empty title");
          done();
        })
    })

    // C3
    it("400 + Empty content", function (done) {
      const data = {
        title: 'Aeon',
        content: ''
      }

      chai.request(app)
        .post('/post')
        .set('access_token', 'insertaccesstokenhere') //! INSERT ACCESS TOKEN HERE ONCE MADE
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Empty content");
          done();
        })
    })

    // C4
    it("401 + User unauthorized", function (done) {
      const data = {
        title: '',
        content: 'contents are not not available at the moment'
      }

      chai.request(app)
        .post('/post')
        .set('access_token', 'insertaccesstokenhere') //! INSERT ACCESS TOKEN HERE ONCE MADE
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("User unauthorized");
          done();
        })
    })
  })

  // R4
  describe("/post PUT", function () {

    // C1
    it("200 + Blog post successfully edited", function (done) {
      const data = {
        title: 'Aeon',
        content: 'contents are not not available at the moment'
      }

      chai.request(app)
        .put('/post')
        .set('access_token', 'insertaccesstokenhere') //! INSERT ACCESS TOKEN HERE ONCE MADE
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Blog post successfully edited");
          done();
        })
    })

    // C2
    it("400 + Empty title", function (done) {
      const data = {
        title: '',
        content: 'contents are not not available at the moment'
      }

      chai.request(app)
        .put('/post')
        .set('access_token', 'insertaccesstokenhere') //! INSERT ACCESS TOKEN HERE ONCE MADE
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Empty title");
          done();
        })
    })

    // C3
    it("400 + Empty content", function (done) {
      const data = {
        title: 'Aeon',
        content: ''
      }

      chai.request(app)
        .put('/post')
        .set('access_token', 'insertaccesstokenhere') //! INSERT ACCESS TOKEN HERE ONCE MADE
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Empty content");
          done();
        })
    })

    // C4
    it("401 + User unauthorized", function (done) {
      const data = {
        title: '',
        content: 'contents are not not available at the moment'
      }

      chai.request(app)
        .put('/post')
        .set('access_token', '')
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("User unauthorized");
          done();
        })
    })
  })

  // R5
  describe("/post DELETE", function () {

    // C1
    it("200 + Blog post successfully deleted", function (done) {
      const data = {
        id: '' // ! INSERT BLOG POST ID HERE
      }

      chai.request(app)
        .del('/post')
        .set('access_token', 'insertaccesstokenhere') //! INSERT ACCESS TOKEN HERE ONCE MADE
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Blog post successfully deleted");
          done();
        })
    })

    // C2
    it("400 + Blog post not found", function (done) {
      const data = {
        id: 'a'
      }

      chai.request(app)
        .del('/post')
        .set('access_token', 'insertaccesstokenhere') //! INSERT ACCESS TOKEN HERE ONCE MADE
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Blog post not found");
          done();
        })
    })

    // C3
    it("401 + User unauthorized", function (done) {
      const data = {
        id: '' // ! INSERT TOKEN HERE
      }

      chai.request(app)
        .del('/post')
        .set('access_token', 'cc')
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("User unauthorized");
          done();
        })
    })
  })

  // R6
  describe("/post GET", function () {

    // C1
    it("200 + Blog post successfully deleted", function (done) {
      chai.request(app)
        .get('/post')
        .type('form')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Success");
          expect(res.body.data).to.be.an('array')
          done();
        })
    })
  })

  // R7
  describe("/post/c POST", function () {

    // C1
    it("201 + Comment successfully posted", function (done) {
      const data = {
        postId: '', // ! Insert post's ID
        comment: 'Man this sucks.' // ! Insert comment here
      }

      chai.request(app)
        .post('/post/c')
        .type('form')
        .set('access_token', '') //! PUT ACCESS TOKEN HERE
        .end(function (err, res) {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Comment successfully posted");
          expect(res.body.data).to.be.an('object');
          done();
        })
    })

    // C2
    it("400 + Post not found", function (done) {
      const data = {
        postId: 'asdajsd',
        comment: 'Man this sucks.' // ! Insert comment here
      }

      chai.request(app)
        .post('/post/c')
        .type('form')
        .set('access_token', '') //! PUT ACCESS TOKEN HERE
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Post not found");
          done();
        })
    })

    // C3
    it("400 + Empty comment", function (done) {
      const data = {
        postId: 'asdajsd', //! Insert post ID here
        comment: ''
      }

      chai.request(app)
        .post('/post/c')
        .type('form')
        .set('access_token', '') //! PUT ACCESS TOKEN HERE
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Empty comment");
          done();
        })
    })

    // C4
    it("401 + User unauthorized", function (done) {
      const data = {
        postId: '', //! Insert post ID here
        comment: 'Man this sucks.'
      }

      chai.request(app)
        .post('/post/c')
        .type('form')
        .set('access_token', 'hehe')
        .end(function (err, res) {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("User unauthorized");
          done();
        })
    })
  })

  // R8
  describe("/post/c GET", function () {

    // C1
    it("200 + Success", function (done) {
      const data = {
        postId: '', // ! Insert post's ID
      }

      chai.request(app)
        .get('/post/c')
        .type('form')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Success");
          expect(res.body.data).to.be.an('array');
          done();
        })
    })

    // C2
    it("400 + Post not found", function (done) {
      const data = {
        postId: 'asdajsd'
      }

      chai.request(app)
        .get('/post/c')
        .type('form')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Post not found");
          done();
        })
    })
  })

  // R9
  describe("/post/c DELETE", function() {

    // C1
    it("200 + Comment successfully deleted", function(done) {
      const data = {
        postId: '', // ! Insert post ID here
        commentId: '' // ! Insert comment's ID here
      }

      chai.request(app)
        .del('/post/c')
        .set('access_token', '') // ! Insert access token here
        .type('form')
        .send(data)
        .end(function(err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Comment successfully deleted')
        })
    })

    // C2
    it("400 + Post not found", function(done) {
      const data = {
        postId: 'asdad',
        commentId: '' // ! Insert comment's ID here
      }

      chai.request(app)
        .del('/post/c')
        .set('access_token', '') // ! Insert access token here
        .type('form')
        .send(data)
        .end(function(err, res) {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Post not found')
        })
    })

    // C3
    it("400 + Comment not found", function(done) {
      const data = {
        postId: '', // ! Insert post's ID here
        commentId: 'asdasd'
      }

      chai.request(app)
        .del('/post/c')
        .set('access_token', '') // ! Insert access token here
        .type('form')
        .send(data)
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Comment not found");
        })
    })

    // C4
    it("401 + User unauthorized", function(done) {
      const data = {
        postId: '', // ! Insert post's ID here
        commentId: '' // ! Insert comment's ID here
      }

      chai.request(app)
        .del('/post/c')
        .set('access_token', 'asdasd')
        .type('form')
        .send(data)
        .end(function(err, res) {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("User unauthorized");
        })
    })
  })
})