import cookieParser from 'cookie-parser';
import express from 'express'
import mysql from 'mysql2/promise'
import bt from 'bcrypt'
import z from 'zod'
import { Games,User } from './model/baseModel.js';
import jwt from 'jsonwebtoken'

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(async (req,res)=>{
//     const refreshtoken = req.cookies.refresh_token
//     let data = null
//     if(req.path == '/logout'){
//         return next()}
//     if (refreshtoken===undefined){}
//     else{
//         data = jwt.verify(refreshtoken,SECRET_KEY_JWT)   
//     }
//     if (!data){
//     }else{
//          try { 
//              const stored_token = await TokenRepo.getToken(data)
//              if(stored_token.token===refreshtoken){
//                  const newAccessToken = jwt.sign({id: data.id,username: data.username},SECRET_KEY_JWT,{
//                     expiresIn:'10s'
//                 })
//                 req.cookies.access_token = newAccessToken
//              next()
//              }
//          } catch (error) {
//              console.log(error)
//          }  
//     }
//     next()
// });


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
        res.status(300).send({message: error})
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

app.get('/login',(req,res)=>{
    const form = `<h1>Login Page</h1><form method="POST" action="/login">\
	 Enter Username:<br>
     <input type="text" name="username">\
	 <br>Enter Password:<br>
     <input type="password" name="password">\
	 <br><br>
     <input type="submit" value="Submit"></form>`;
 
	 res.send(form);
})

app.post('/login',async (req,res)=>{
    
})

app.get('/register',(req,res)=>{
    const form = `<h1>Register Page</h1>
    <form method="post" action="register">\
    Enter Username:
    <br><input type="text" name="username">\
    <br>Enter Password:
    <br><input type="password" name="psswd">\
    <br>Email:
    <br><input type="text" name="email">\
    <br>ref:
    <br><input type="text" name="profileP">\
    <br><input type="submit" value="Submit">
    </form>`;
 
	res.send(form);
})

app.post('/register',(req,res)=>{
    fetch('http://localhost:3000/api/users',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(req.body)
    }).then(res.status(200).redirect('/login'))
    .catch(res.status(300))
    
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 