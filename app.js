import cookieParser from 'cookie-parser';
import express from 'express'
import mysql from 'mysql2/promise'
import bt from 'bcrypt'
import z from 'zod'
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

const passwordSQL = process.env.PASSWORD_MYSQL

const optionsConnection={
    host:'localhost',
    port: 3306,
    user: 'root',
    password: passwordSQL,
    database: 'Critical_Heat'
}

const db = mysql.createPool(optionsConnection);



app.get('/api/games', async (req, res) => {
    const result = await db.query('SELECT * FROM GameTag;') 
    res.status(200).send(result[0])
});

app.get('/api/games/:id',(req,res)=>{
    res.status(200).send({message:"One game"});
});

app.post('/api/games',async (req,res)=>{
    const info = req.body
    const id = uuidv4();
    const result = await db.query(`INSERT INTO 
        Games VALUES 
        (?,?,?,?,?,?,?,?,?)`,[id,info.title,info.genre,info.developer,
            info.publisher,info.release_date,info.descp,info.cover_ref,info.Base_price]);
    res.status(201).send(result[0]);
})

app.put('/api/games/:id',()=>{
    res.status(200).send({message:"game Edited"});
})

app.post('/api/reviews',(req,res)=>{
    res.status(201).send({message:"adding review"});
})

app.get('/api/reviews',()=>{
    res.status(200).send({message:"all Reviews"});
});

app.get('/api/reviews/:id',()=>{
    res.status(200).send({message:"One Review"});
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 