import express from 'express'
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import path from 'node:path';

const app = express();
const PORT = 5000;

// middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

const products = [
    { id: 1, name: "Product1", category: "Electronics", price: 288 },
    { id: 2, name: "Product2", category: "Fashion", price: 1299 },
    { id: 3, name: "Product3", category: "Electronics", price: 499 },
]

// READ - List all products
app.get('/', (req, res) => {
    res.render('products', { products });
})

// CREATE - Add a new product
app.post('/add-product', (req, res) => {
    const { name, category, price } = req.body;
    const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
    const id = maxId + 1;
    products.push({ id, name, category, price: Number(price) });
    res.redirect('/');
});

// READ - Show edit form
app.get('/edit-product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.render('edit-product', { product });
    } else {
        res.status(404).send('Product not found');
    }
});

// UPDATE - Handle updating product data
app.post('/update-product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, category, price } = req.body;
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { id, name, category, price: Number(price) };
        res.redirect('/');
    } else {
        res.status(404).send('Product not found');
    }
});

// DELETE - Remove a product
app.get('/delete-product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
})