// 代码生成时间: 2025-10-01 20:03:35
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory database to store supply chain data
const supplyChainDatabase = {};

// Generate a unique identifier for each product
function generateProductId() {
    return uuidv4();
}

// Endpoint to add a product to the supply chain
app.post('/addProduct', (req, res) => {
    try {
        const { name, details } = req.body;
        if (!name || !details) {
            return res.status(400).json({
                error: 'Product name and details are required'
            });
        }
        const productId = generateProductId();
        supplyChainDatabase[productId] = { name, details, steps: [] };
        res.status(201).json({ productId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to add a step to the supply chain
app.post('/addStep', (req, res) => {
    try {
        const { productId, step } = req.body;
        if (!productId || !step) {
            return res.status(400).json({
                error: 'Product ID and step details are required'
            });
        }
        const product = supplyChainDatabase[productId];
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product.steps.push(step);
        res.status(200).json({ message: 'Step added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to retrieve the supply chain steps for a product
app.get('/getSteps/:productId', (req, res) => {
    try {
        const { productId } = req.params;
        const product = supplyChainDatabase[productId];
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ steps: product.steps });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Supply Chain Traceability Service is running on port ${PORT}`);
});

// Documentation and comments are provided within each function and endpoint
