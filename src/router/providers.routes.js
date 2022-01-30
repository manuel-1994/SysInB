const express = require('express');
const { validateData, validateEmail } = require('../middleware');
const Providers = require('../services/providers.service');

const providers = (app) => {
  const router = express.Router();
  app.use('/api/providers',router);
  const providersService = new Providers();

  router.get('/', async (req,res)=>{
    const result = await providersService.getAllProviders();
    return res.status(200).json(result);
  });

  router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    const result = await providersService.getProvider({_id:id});
    return res.status(200).json(result);
  });

  router.post('/',validateData.provider,validateEmail.provider, async (req,res)=>{
    const result = await providersService.createProvider(req.body);
    return res.status(201).json(result);
  });

  router.put('/:id',validateData.provider, async (req,res)=>{
    const {id} = req.params;
    const result = await providersService.updateProvider(id,req.body);
    return res.status(200).json(result);
  });

  router.delete('/:id', async (req,res)=>{
    const {id} = req.params;
    const result = await providersService.deleteProvider(id)
    return res.status(200).json(result);
  })

};

module.exports = providers;