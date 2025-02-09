import cookieParser from 'cookie-parser';
import express from 'express'


const PORT = process.env.PORT;

const app = express();
app.use(express.json());



app.get('/api/games', (req, res) => {
      res.status(200).send({message:"all games"})
});

app.get('/api/games/:id',(req,res)=>{
    res.status(200).send({message:"One game"});
});

app.post('/api/games',(req,res)=>{
    res.status(201).send({message:"Game added"});
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