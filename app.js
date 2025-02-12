import cookieParser from 'cookie-parser';
import express from 'express'
import mysql from 'mysql2/promise'
import bt from 'bcrypt'
import z from 'zod'
import { Games } from './model/baseModel';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

const passwordSQL = process.env.PASSWORD_MYSQL
const SALT = process.env.SALT_ROUND

const optionsConnection={
    host:'localhost',
    port: 3306,
    user: 'root',
    password: passwordSQL,
    database: 'Critical_Heat'
}

const db = mysql.createPool(optionsConnection);



app.get('/api/games', async (req, res) => {
    const result = await db.query('SELECT * FROM Games;') 
    res.status(200).send(result[0])
});

app.get('/api/games/:id',async (req,res)=>{
    const id = req.params.id;
    const result = await db.query(`SELECT * FROM Games WHERE game_id = ?`,id);
    const row = result[0]
    res.status(200).send(row);
});

app.post('/api/games',async (req,res)=>{
    const info = req.body;
    const result = await Games.create(info);
    res.status(201).send(result);
})

app.put('/api/games/:id',()=>{
    res.status(200).send({message:"game Edited"});
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
    const id = crypto.randomUUID();
    const hashedPassword = bt.hashSync(info.password,10);
    const result = await db.query(`INSERT INTO 
        Users(user_id,username,email,passwd,profile_picture_ref) VALUES 
        (?,?,?,?,?)`,[id,info.username,info.email,hashedPassword,info.profilePic]);
    res.status(200).send(result[0]);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 