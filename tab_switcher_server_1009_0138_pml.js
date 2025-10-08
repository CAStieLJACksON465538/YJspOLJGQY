// 代码生成时间: 2025-10-09 01:38:21
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Define the tabs that can be switched between
const tabs = {
  "home": {
    "title": "Home", 
    "content": "Welcome to the Home tab"
  },
  "about": {
    "title": "About", 
    "content": "This is the About tab"
  },
  "contact": {
    "title": "Contact", 
    "content": "Contact us here"
  }
};

// Handle the GET request for switching tabs
app.get('/tab/:tabName', (req, res) => {
  const { tabName } = req.params;
  // Check if the tab exists
  if (tabs[tabName]) {
    // Return the tab content
    res.json(tabs[tabName]);
  } else {
    // If the tab does not exist, return a 404 error
    res.status(404).json({
      error: 'Tab not found'
    });
  }
});

// Handle the error for any other routes
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Tab switcher server listening at http://localhost:${port}`);
});