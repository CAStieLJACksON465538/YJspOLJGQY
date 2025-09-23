// 代码生成时间: 2025-09-24 03:48:38
const express = require('express');
const { scheduleJob } = require('node-schedule');
const app = express();
const port = 3000;

// Helper function to log messages with a timestamp
function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// Define a job function that will be executed according to the schedule
function jobFunction() {
  log('Job has been executed');
}

// Schedule the job to run every day at 12:00 PM
const schedule = '0 0 12 * * *';
scheduleJob(schedule, jobFunction);

// Error handling middleware
app.use((err, req, res, next) => {
  log(`Error: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Home route for testing the app is running
app.get('/', (req, res) => {
  res.send('Scheduler App is running');
});

// Start the server
app.listen(port, () => {
  log(`Server listening at http://localhost:${port}`);
});

// The code above sets up an Express server with a single route that returns a message indicating the server is running.
// It also schedules a job using the 'node-schedule' library to run a function every day at 12:00 PM.
// The job function logs a message to the console when it is executed.
// Error handling is implemented to ensure that any server errors are logged and a 500 status is returned to the client.
// This structure allows for easy maintenance and extension of the application, such as adding more routes or jobs.
