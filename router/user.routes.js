const express = require('express');
const Users = require("../services/user.service");

const users = (app)=>{
  const router = express.Router();
  app.use('/api/users', router);
  const userService = new Users();

  router.get('/', async (req,res)=>{
    const result = await userService.getUsers();
    res.status(200).json(result);
  });

  router.post('/', async (req,res)=>{
    const data = req.body;
    const result = await userService.createUser(data);
    res.status(201).json(result);
  });

  router.put('/:id', async (req,res)=>{
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