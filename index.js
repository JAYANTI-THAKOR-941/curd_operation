import express from 'express'
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import path from 'node:path';

const app = express();
const PORT = 5000;

// middlewares

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine','ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

const products = [
    {id:1,name:"Product1",category:"Electronics",price:288},
    {id:2,name:"Product2",category:"Fashion",price:1299},
    {id:3,name:"Product3",category:"Electronics",price:499},
]

app.get('/',(req,res)=>{
    res.render('products',{products});
})



// app.get('/',(req,res)=>{
//     res.end("Express server is Running!");
// });

app.listen(PORT,()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
})