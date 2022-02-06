const chai = require('chai');
const chaiHTTP = require('chai-http');
const ClientsModel = require('../src/models/clients.model');
const app = require('../src/app');

//assertion style
chai.should()
//middleware
chai.use(chaiHTTP);

before('Clients', async ()=>{
      await ClientsModel.remove({})
})

describe('Clients service',()=>{
  let id;
  //test the POST router
  describe('/POST Clients', ()=>{
    it('it should POST for create a client', async ()=>{
      const client = await chai.request(app)
            .post('/api/clients')
            .send({
              firstName: "manuel",
              lastName: "marin",
              address: "caracas",
              email: "mail@gmail.com",
              phoneNumber: "04242234831"
            })
            client.should.have.status(201)
            client.body.should.be.a('object')
            client.body.message.should.be.eql('Cliente creado exitosamente')
            id = client.body.data._id
    })

    it('it should NOT create a client by existing email error', async ()=>{
      const client = await chai.request(app)
            .post('/api/clients')
            .send({
              firstName: "manuel",
              lastName: "marin",
              address: "caracas",
              email: "mail@gmail.com",
              phoneNumber: "04242234831"
            })
            client.should.have.status(400)
            client.body.should.be.a('object')
            client.body.message.should.be.eql('El email ya existe')
    })

  })

  //test the GET router
  describe('/GET Clients', ()=>{
    it('it should GET all clients', async ()=>{
       const clients= await chai.request(app)
            .get('/api/clients')
            clients.should.have.status(200)
            clients.body.should.be.a('array')
            clients.body.length.should.be.eql(1)
    })

    it('it should NOT GET all clients', async ()=>{
      const clients = await chai.request(app)
          .get('/api/client')
          clients.should.have.status(404)
  })
  })
  
  //test the GET by id router
  describe('/GET Client by id', ()=>{
    it('it should GET a client', async()=>{
        const client = await chai.request(app)
            .get(`/api/clients/${id}`)
            client.should.have.status(200)
            client.body.should.be.a('object')
            client.body.should.have.property('firstName')
            client.body.should.have.property('lastName')
            client.body.should.have.property('address')
            client.body.should.have.property('email')
            client.body.should.have.property('phoneNumber')
    })
  })
  //test the PUT by id router
  describe('/PUT Client by id', ()=>{
    it('it should PUT a client', async ()=>{
        const client = await chai.request(app)
            .put(`/api/clients/${id}`)
            .send({
              firstName: "manuel",
              lastName: "marin",
              address: "caracas",
              email: "mail@gmail.com",
              phoneNumber: "04242234832"
            })
            client.should.have.status(200)
            client.body.message.should.be.eql('Cliente actualizado exitosamente')
    })
  })
  //test the DELETE by id router
  describe('/DELETE Client by id', ()=>{
    it('it should DELETE a client', async()=>{
        const client = await chai.request(app)
            .delete(`/api/clients/${id}`)
            client.should.have.status(200)
            client.body.message.should.be.eql('Cliente eliminado exitosamente')
    })
  })
})