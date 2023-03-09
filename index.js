const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')

const app = express()

app.use(express.json())

// Routes
app.get('/', (req,res) => {
    res.send('Hello Node API')
})

app.get('/blog', (req,res) => {
    res.send('Hello Blog')
})

// Add a product 
app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.error(err.message);
        res.status(500).json({message: error.message})
    }
})

// Get all products
app.get('/product', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
})

// Get a single product 
app.get('/product/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        console.error(error);
        res.status(200).json({message: error.message})
    }
})

// Update a product 
app.put('/product/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
       
    //    Cannot find any product in the database
        if(!product) {
            return res.status(404).json({message: `cannot find any product with id ${id}`})
        }
         const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
})


// Delete a product from the database
app.delete('/product/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)

    //    Cannot find any product in the database
        if (!product) {
            return res.status(404).json({message: `cannot find any product with id ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
})


// Connect to mongoDB using mongoose
mongoose.connect('mongodb+srv://delaricch:Dh!m012345@restapi.ebidamj.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to mongoDB');

    app.listen(3000, () => {
        console.log(`Node API is running on port 3000`);
    }) 
}).catch((err) => {
    console.error(err);
})