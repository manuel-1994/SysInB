const mongoose = require('mongoose');
const chai = require("chai");
const chaiHTTP = require("chai-http");
const UserModel = require('../src/models/user.model');
const app = require("../src/app");

//assertion style
chai.should()
//middleware
chai.use(chaiHTTP);

before('Users',(done)=>{
  UserModel.remove({},(err)=>{
    done()
  })
})

describe('Users service',()=>{ 
  let id;
  //test the POST router
  describe('/POST Users', ()=>{
    it('it should POST for create a user', (done)=>{
        chai.request(app)
            .post('/api/users')
            .send({
              username: "admin10",
              email: "admin18@gmail.com",
              password: "admin123123",
            })
            .end((err,res)=>{
              res.should.have.status(201)
              res.body.should.be.a('object')
              res.body.message.should.be.eql('Usuario creado exitosamente')
              id = res.body.data._id
              done()
            })
    })

    it('it should NOT POST for create a user', (done)=>{
      chai.request(app)
          .post('/api/users')
          .send({
            username: "admin10",
            email: "admin18@gmail.com",
            password: "admin123123",
          })
          .end((err,res)=>{
            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.message.should.be.eql('El nombre de usuario ya existe')
            done()
          })
  })
  })

  //test the GET router
  describe('/GET Users', ()=>{
    it('it should GET all users', (done)=>{
        chai.request(app)
            .get('/api/users')
            .end((err,res)=>{
              res.should.have.status(200)
              res.body.should.be.a('array')
              res.body.length.should.be.eql(1)
              done()
            })
    })

    it('it should NOT GET all users', (done)=>{
      chai.request(app)
          .get('/api/user')
          .end((err,res)=>{
            res.should.have.status(404)
            done()
          })
  })
  })
  
  //test the GET by id router
  describe('/GET User by id', ()=>{
    it('it should GET a user', (done)=>{
        chai.request(app)
            .get(`/api/users/${id}`)
            .end((err,res)=>{
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('username')
              res.body.should.have.property('email')
              res.body.should.have.property('password')
              done()
            })
    })
  })
  //test the PUT by id router
  describe('/PUT User by id', ()=>{
    it('it should PUT a user', (done)=>{
        chai.request(app)
            .put(`/api/users/${id}`)
            .send({
              username: "admin10",
              email: "admin18@gmail.com",
              password: "admin1214007"
            })
            .end((err,res)=>{
              res.should.have.status(200)
              res.body.message.should.be.eql('Usuario actualizado exitosamente')
              done()
            })
    })
  })
  //test the DELETE by id router
  describe('/DELETE User by id', ()=>{
    it('it should DELETE a user', (done)=>{
        chai.request(app)
            .delete(`/api/users/${id}`)
            .end((err,res)=>{
              res.should.have.status(200)
              res.body.message.should.be.eql('Usuario eliminado exitosamente')
              done()
            })
    })
  })
})


