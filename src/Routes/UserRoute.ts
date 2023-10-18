
import express from 'express'

import UserController from '../Controller/UserController';
import { checkToken } from '../util/validation';

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const u = await UserController.getAll()
        res.status(200).json(u)
    } catch (error) {
        res.status(400).json(error)
    }
});

router.get('/:id',checkToken, async (req, res) =>{
    try {
        const userId = req.params.id;
        const u = await UserController.getById(userId)
        res.status(200).json(u)
    } catch (error) {
        res.status(400).json(error)
    }
});

router.put('/:id', async (req, res)=>{
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;
        const u = UserController.put(userId, updatedUserData)
    } catch (error) {
        res.status(400).json(error)
    }
});

router.delete('/:id', async(req, res)=>{
    try {
        const userId = req.params.id;
        const u = await UserController.delete(userId)
        res.status(200).json(u)
    } catch (error) {
        res.status(400).json(error)
    }
});

export default router
