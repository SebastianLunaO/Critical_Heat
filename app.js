import cookieParser from 'cookie-parser';
import express from 'express'
import mysql from 'mysql2/promise'
import bt from 'bcrypt'
import z from 'zod'
import { Games,User } from './model/baseModel.js';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());




app.get('/api/games', async (req, res) => {
    const result = await Games.getAll()
    res.status(200).send(result)
});

app.get('/api/games/id/:id',async (req,res)=>{
    const id = req.params.id
    const result = await Games.getByID(id)   
    res.status(200).send(result);
});

app.get('/api/games/name/:name',async (req,res)=>{
    const name = req.params.name
    const result = await Games.getByID(name)
    res.status(200).send(result);
});

app.post('/api/games',async (req,res)=>{
    const info = req.body;
    const result = await Games.create(info);
    res.status(201).send(result);
})

app.put('/api/games/id/:id',async (req,res)=>{
    const info = req.body
    const result = await Games.edit(info)
    res.status(200).send(result);
})

app.post('/api/reviews',async (req,res)=>{
    res.status(201).send({message:"adding review"});
})

app.get('/api/reviews',()=>{
    res.status(200).send({message:"all Reviews"});
});

app.get('/api/reviews/:id',()=>{
    res.status(200).send({message:"One Review"});
})

app.post('/api/users',async (req,res)=>{
    const info = req.body
    try {
        const result = await User.create(info)
        res.status(201).send(result);
    } catch (error) {
        res.status(300).send({message:"Error on the submit data"})
    }
})

app.get('/api/users/:id',async (req,res)=>{
    const info= req.params
    try {
        const result = await User.getByID(info.id)
        res.status(200).send(result);
    } catch (error) {
        res.status(404)
    }
    
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 