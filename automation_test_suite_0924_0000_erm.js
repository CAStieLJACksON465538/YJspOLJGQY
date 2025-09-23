// 代码生成时间: 2025-09-24 00:00:14
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Test Routes
/**
 * Test route for GET request
 */
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test GET request successful' });
});

/**
 * Test route for POST request
 * @param {string} data - The data to be sent in the POST request body
 */
app.post('/test', (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ error: 'No data provided' });
  }
  res.status(200).json({ message: 'Test POST request successful', receivedData: data });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

// Start server
app.listen(port, () => {
  console.log(`Automation Test Suite listening at http://localhost:${port}`);
});
