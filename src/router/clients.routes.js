const express = require('express');
const { validateData, validateEmail } = require('../middleware');
const Clients = require('../services/clients.service');

const clients = (app) => {
  const router = express.Router();
  const clientService = new Clients();
  app.use('/api/clients',router);
  
  router.get('/', async (req,res)=>{
    const result = await clientService.getAllData();
    return res.status(200).json(result);
  });

  router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    const result = await clientService.getData({_id:id});
    return res.status(200).json(result);
  });

  router.post('/',validateData.client,validateEmail.client, async (req,res)=>{
    const result = await clientService.createData(req.body);
    return res.status(201).json(result);
  });

  router.put('/:id',validateData.client, async (req,res)=>{
    const {id} = req.params;
    const result = await clientService.updateData(id,req.body);
    return res.status(200).json(result);
  });

  router.delete('/:id', async (req,res)=>{
    const {id} = req.params;
    const result = await clientService.deleteData(id)
    return res.status(200).json(result);
  })

};

module.exports = clients;