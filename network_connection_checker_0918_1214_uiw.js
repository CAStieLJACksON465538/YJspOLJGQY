// 代码生成时间: 2025-09-18 12:14:47
const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Function to check network connection status
function checkConnection(url) {
  return new Promise((resolve, reject) => {
    exec(`ping -c 1 ${url}`, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error || stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

// Route to check network connection
app.get('/api/check-connection', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).send({
        error: 'URL is required.'
      });
    }
    // Check network connection
    const result = await checkConnection(url);
    // Send response with connection status
    res.status(200).send({
      status: 'success',
      message: result
    });
  } catch (error) {
    // Handle any errors that occur during the connection check
    res.status(500).send({
      status: 'error',
      message: error.message
    });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Network Connection Checker listening at http://localhost:${port}`);
});