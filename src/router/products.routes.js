const express = require('express');
const { validateData, validateProduct } = require('../middleware');
const Products = require('../services/products.service')

const products = (app) =>{
  const router = express.Router();
  const productsService = new Products();
  app.use('/api/products', router);

  router.get('/', async (req,res)=>{
    const {query} = req;
    const response = await productsService.getAllData(query);
    res.status(200).json(response);
  })

  router.get('/:id', async (req,res)=>{
    const {id} = req.params
    const response = await productsService.getData({_id:id})
    res.status(200).json(response);
  })
  
  router.post('/', validateData.product,validateProduct, async (req,res)=>{
    const data = req.body;
    const response = await productsService.createData(data);
    res.status(201).json(response);
  })

  router.put('/:id', validateData.product, async (req,res)=>{
    const {id} = req.params;
    const response = await productsService.updateData(id, req.body);
    res.status(200).json(response);
  })

  router.delete('/:id', async (req,res)=>{
    const {id} = req.params;
    const response = await productsService.deleteData(id);
    res.status(200).json(response);
  })
}

module.exports = products;