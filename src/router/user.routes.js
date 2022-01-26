const express = require('express');
const {newUserValidation, userUpdateValidation } = require('../middleware/userValidation');
const Users = require("../services/users.service");

const users = (app)=>{
  const router = express.Router();
  app.use('/api/users', router);
  const userService = new Users();

  router.get('/', async (req,res)=>{
    const result = await userService.getUsers();
    res.status(200).json(result);
  });

  router.get('/:id',async (req,res)=>{
    const _id=req.params.id;
    const result = await userService.getUser({_id});
    res.status(200).json(result);
  });

  router.post('/',newUserValidation, async (req,res)=>{
    const data = req.body;
    const result = await userService.createUser(data);
    return res.status(201).json(result);
  });

  router.put('/:id',userUpdateValidation, async (req,res)=>{
    const id = req.params.id;
    const data = req.body;
    const result = await userService.updateUser(id,data);
    res.status(200).json(result);
  });

  router.delete('/:id', async(req,res)=>{
    const id = req.params.id;
    const result = await userService.deleteUser(id);
    res.status(200).json(result);
  });
};

module.exports = users;