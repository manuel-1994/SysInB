const chai = require('chai');
const chaiHTTP = require('chai-http');
const ProvidersModel = require('../src/models/providers.model');
const app = require('../src/app');

//assertion style
chai.should()
//middleware
chai.use(chaiHTTP);

before('Providers', async ()=>{
  await ProvidersModel.remove({})
})

describe('Providers service',()=>{
  let id;
  //test the POST router
  describe('/POST Providers', ()=>{
    it('it should POST for create a provider', async ()=>{
      const provider = await chai.request(app)
            .post('/api/providers')
            .send({
              name: "manuel",
              address: "caracas",
              email: "mail@gmail.com",
              phoneNumber: "04242234831"
            })
            provider.should.have.status(201)
            provider.body.should.be.a('object')
            provider.body.message.should.be.eql('Proveedor creado exitosamente')
            id = provider.body.data._id
    })

    it('it should NOT create a provider by existing email error', async ()=>{
      const provider = await chai.request(app)
            .post('/api/providers')
            .send({
              name: "manuel",
              address: "caracas",
              email: "mail@gmail.com",
              phoneNumber: "04242234831"
            })
            provider.should.have.status(400)
            provider.body.should.be.a('object')
            provider.body.message.should.be.eql('El email ya existe')
    })

  })

  //test the GET router
  describe('/GET Providers', ()=>{
    it('it should GET all providers', async ()=>{
       const providers= await chai.request(app)
            .get('/api/providers')
            providers.should.have.status(200)
            providers.body.should.be.a('array')
            providers.body.length.should.be.eql(1)
    })

    it('it should NOT GET all providers', async ()=>{
      const providers = await chai.request(app)
          .get('/api/provider')
          providers.should.have.status(404)
  })
  })
  
  //test the GET by id router
  describe('/GET Provider by id', ()=>{
    it('it should GET a provider', async()=>{
        const provider = await chai.request(app)
            .get(`/api/providers/${id}`)
            provider.should.have.status(200)
            provider.body.should.be.a('object')
            provider.body.should.have.property('name')
            provider.body.should.have.property('address')
            provider.body.should.have.property('email')
            provider.body.should.have.property('phoneNumber')
    })
  })
  //test the PUT by id router
  describe('/PUT Provider by id', ()=>{
    it('it should PUT a provider', async ()=>{
        const provider = await chai.request(app)
            .put(`/api/providers/${id}`)
            .send({
              name: "manuel",
              address: "caracas",
              email: "mail@gmail.com",
              phoneNumber: "04242234832"
            })
            provider.should.have.status(200)
            provider.body.message.should.be.eql('Proveedor actualizado exitosamente')
    })
  })
  //test the DELETE by id router
  describe('/DELETE Provider by id', ()=>{
    it('it should DELETE a provider', async()=>{
        const provider = await chai.request(app)
            .delete(`/api/providers/${id}`)
            provider.should.have.status(200)
            provider.body.message.should.be.eql('Proveedor eliminado exitosamente')
    })
  })
})