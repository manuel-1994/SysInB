const express = require('express');
const { validateData, validateEmail } = require('../middleware');
const Providers = require('../services/providers.service');

const providers = (app) => {
  const router = express.Router();
  const providersService = new Providers();
  app.use('/api/providers',router);

  router.get('/', async (req,res)=>{
    const result = await providersService.getAllData();
    return res.status(200).json(result);
  });

  router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    const result = await providersService.getData({_id:id});
    return res.status(200).json(result);
  });

  router.post('/',validateData.provider,validateEmail.provider, async (req,res)=>{
    const result = await providersService.createData(req.body);
    return res.status(201).json(result);
  });

  router.put('/:id',validateData.provider, async (req,res)=>{
    const {id} = req.params;
    const result = await providersService.updateData(id,req.body);
    return res.status(200).json(result);
  });

  router.delete('/:id', async (req,res)=>{
    const {id} = req.params;
    const result = await providersService.deleteData(id)
    return res.status(200).json(result);
  })

};

module.exports = providers;