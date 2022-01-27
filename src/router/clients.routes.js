const express = require('express');
const Clients = require('../services/clients.service');

const clients = (app) => {
  const router = express.Router();
  app.use('/api/clients',router);
  const clientService = new Clients();

  router.get('/', async (req,res)=>{
    const result = await clientService.getAllClients();
    return res.status(200).json(result);
  });

  router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    const result = await clientService.getClient({_id:id});
    return res.status(200).json(result);
  });

  router.post('/', async (req,res)=>{
    const result = await clientService.createClient(req.body);
    return res.status(201).json(result);
  });

  router.put('/:id', async (req,res)=>{
    const {id} = req.params;
    const result = await clientService.updateClient(id,req.body);
    return res.status(200).json(result);
  });

  router.delete('/:id', async (req,res)=>{
    const {id} = req.params;
    const result = await clientService.deleteClient(id)
    return res.status(200).json(result);
  })

};

module.exports = clients;