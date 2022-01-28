const chai = require("chai");
const chaiHTTP = require("chai-http");
const UserModel = require('../src/models/users.model');
const app = require("../src/app");

//assertion style
chai.should()
//middleware
chai.use(chaiHTTP);

before('Users', async ()=>{
  await UserModel.remove({})
})

describe('Users service',()=>{ 
  let id;
  //test the POST router
  describe('/POST Users', ()=>{
    it('it should POST for create a user', async ()=>{
        const user = await chai.request(app)
        .post('/api/users')
        .send({
          username: "admin10",
          email: "admin18@gmail.com",
          password: "admin123123",
        })
        user.should.have.status(201)
        user.body.should.be.a('object')
        user.body.message.should.be.eql('Usuario creado exitosamente')
        id = user.body.data._id
    })

    it('it should NOT POST for create a user', async ()=>{
        const user = await chai.request(app).post('/api/users').send({
          username: "admin10",
          email: "admin18@gmail.com",
          password: "admin123123",
        })
        user.should.have.status(400)
        user.body.should.be.a('object')
        user.body.message.should.be.eql('El nombre de usuario ya existe')
  })
  })

  //test the GET router
  describe('/GET Users', ()=>{
    it('it should GET all users', async ()=>{
       const user= await chai.request(app)
            .get('/api/users')
            user.should.have.status(200)
            user.body.should.be.a('array')
            user.body.length.should.be.eql(1)
    })

    it('it should NOT GET all users', async ()=>{
      const user = await chai.request(app)
          .get('/api/user')
          user.should.have.status(404)
  })
  })
  
  //test the GET by id router
  describe('/GET User by id', ()=>{
    it('it should GET a user', async()=>{
        const user = await chai.request(app)
            .get(`/api/users/${id}`)
            user.should.have.status(200)
            user.body.should.be.a('object')
            user.body.should.have.property('username')
            user.body.should.have.property('email')
            user.body.should.have.property('password')
    })
  })
  //test the PUT by id router
  describe('/PUT User by id', ()=>{
    it('it should PUT a user', async ()=>{
        const user = await chai.request(app)
            .put(`/api/users/${id}`)
            .send({
              username: "admin10",
              email: "admin18@gmail.com",
              password: "admin125478"
            })
            user.should.have.status(200)
            user.body.message.should.be.eql('Usuario actualizado exitosamente')
    })
  })
  //test the DELETE by id router
  describe('/DELETE User by id', ()=>{
    it('it should DELETE a user', async()=>{
        const user = await chai.request(app)
            .delete(`/api/users/${id}`)
            user.should.have.status(200)
            user.body.message.should.be.eql('Usuario eliminado exitosamente')
    })
  })
})


