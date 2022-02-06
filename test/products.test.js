const chai = require('chai');
const chaiHTTP = require('chai-http');
const ProductsModel = require('../src/models/products.model');
const app = require('../src/app');
const { product } = require('../src/middleware/validateData');

//assertion style
chai.should()
//middleware
chai.use(chaiHTTP);

before('Products', async ()=>{
  await ProductsModel.remove({})
})

describe('Products service', ()=>{
  let id,code,name;
  //test the POST router
  describe('/POST Producst', ()=>{
    it('it should POST for create a product', async ()=>{
      const product = await chai.request(app)
            .post('/api/products')
            .send({
              code: "AB001",
              name: "Arroz blanco",
              category: "comida",
              quantity: 10,
              price: 3000
            })
            product.should.have.status(201)
            product.body.should.be.a('object')
            product.body.message.should.be.eql('Producto creado exitosamente')
            id = product.body.data._id
            code= product.body.data.code
            name= product.body.data.name
    })

    it('it should POST for create a product', async ()=>{
      const product = await chai.request(app)
            .post('/api/products')
            .send({
              code: "AB002",
              name: "Arroz blanco primor",
              category: "comida",
              quantity: 10,
              price: 3000
            })
            product.should.have.status(201)
            product.body.should.be.a('object')
            product.body.message.should.be.eql('Producto creado exitosamente')
    })

    it('it should NOT create a product by existing code error', async ()=>{
      const product = await chai.request(app)
            .post('/api/products')
            .send({
              code: "AB001",
              name: "Arroz blanco",
              category: "comida",
              quantity: 10,
              price: 3000
            })
            product.should.have.status(400)
            product.body.should.be.a('object')
            product.body.message.should.be.eql('El codigo del producto ya existe')
    })

    it('it should NOT create a product by existing name error', async ()=>{
      const product = await chai.request(app)
            .post('/api/products')
            .send({
              code: "AB003",
              name: "Arroz blanco",
              category: "comida",
              quantity: 10,
              price: 3000
            })
            product.should.have.status(400)
            product.body.should.be.a('object')
            product.body.message.should.be.eql('El nombre del producto ya existe')
    })

  })
  //test the GET router
  describe('/GET products', ()=>{
    it('it should Get all products', async ()=>{
      const products = await chai.request(app)
            .get('/api/products')
            products.should.have.status(200)
            products.body.should.be.a('object')
            products.body.should.have.property('data')
            products.body.should.have.property('success')
            products.body.data.should.be.a('array')
            products.body.data.length.should.be.eql(2)
    })

    it('it should NOT GET all clients', async ()=>{
      const products = await chai.request(app)
          .get('/api/product')
          products.should.have.status(404)
  })
  })
  //test the GET by id or querys 
  describe('/Get product', ()=>{
    it('it should get a product by id', async ()=>{
      const product = await chai.request(app)
            .get(`/api/products/${id}`)
            product.should.have.status(200)
            product.body.should.be.a('object')
            product.body.should.have.property('code')
            product.body.should.have.property('name')
            product.body.should.have.property('category')
    })

    it('it should get a product by name', async ()=>{
      const product = await chai.request(app)
            .get(`/api/products/?name=${name}`)
            product.should.have.status(200)
            product.body.should.be.a('object')
            product.body.should.have.property('data')
            product.body.should.have.property('success')
            product.body.data.should.have.property('code')
            product.body.data.should.have.property('name')
            product.body.data.should.have.property('category')
    })

    it('it should get a product by code', async ()=>{
      const product = await chai.request(app)
            .get(`/api/products/?code=${code}`)
            product.should.have.status(200)
            product.body.should.be.a('object')
            product.body.should.have.property('data')
            product.body.should.have.property('success')
            product.body.data.should.have.property('code')
            product.body.data.should.have.property('name')
            product.body.data.should.have.property('category')
    })
  })
  //test the PUT router
  describe('/UPDATE product', ()=>{
    it('it should update a product', async()=>{
      const product = await chai.request(app)
            .put(`/api/products/${id}`)
            .send({
              code: "AB001",
              name: "Arroz blanco",
              category: "comida",
              quantity: 10,
              price: 5000
            })
            product.should.have.status(200)
            product.body.message.should.be.eql('Producto actualizado exitosamente')
    })
  })
  //test the DELETE router
  describe('/UPDATE product', ()=>{
    it('it should delete a product', async()=>{
      const product = await chai.request(app)
            .delete(`/api/products/${id}`)
            product.should.have.status(200)
            product.body.message.should.be.eql('Producto eliminado exitosamente')
    })
  })
})