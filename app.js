import cookieParser from 'cookie-parser';
import express from 'express'


const PORT = process.env.PORT;

const app = express();
app.use(express.json());



app.get('/', (req, res) => {
    
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 