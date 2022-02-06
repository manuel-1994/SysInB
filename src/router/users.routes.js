const express = require('express');
const { validateData, validateUser } = require('../middleware');
const Users = require("../services/users.service");

const users = (app)=>{
  const router = express.Router();
  const userService = new Users();
  app.use('/api/users', router);

  router.get('/', async (req,res)=>{
    const result = await userService.getAllData();
    res.status(200).json(result);
  });

  router.get('/:id',async (req,res)=>{
    const _id=req.params.id;
    const result = await userService.getData({_id});
    res.status(200).json(result);
  });

  router.post('/',validateData.user,validateUser, async (req,res)=>{
    const data = req.body;
    const result = await userService.createData(data);
    return res.status(201).json(result);
  });
  router.put('/:id',validateData.user, async (req,res)=>{
    const id = req.params.id;
    const data = req.body;
    const result = await userService.updateData(id,data);
    res.status(200).json(result);
  });

  router.delete('/:id', async(req,res)=>{
    const id = req.params.id;
    const result = await userService.deleteData(id);
    res.status(200).json(result);
  });
};

module.exports = users;