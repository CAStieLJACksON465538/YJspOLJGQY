// 代码生成时间: 2025-09-19 11:01:20
const express = require('express');
const ExcelJS = require('exceljs');
const path = require('path');

// Initialize the Express application
const app = express();
const port = 3000;

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

/**
 * Generate an Excel file from JSON data
 *
 * @param {Object} data - JSON data to generate Excel file from
 * @returns {Promise} - A promise that resolves with the generated Excel file
 */
function generateExcelFromJson(data) {
  return new Promise((resolve, reject) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Generated Data');

    // Add data to the worksheet
    worksheet.addRow(Object.keys(data[0]));
    data.forEach((row) => {
      worksheet.addRow(Object.values(row));
    });

    // Write to a buffer
    const buffer = ExcelJS.utils.aoa_to_workbook([Object.values(data[0])].concat(data.map((row) => Object.values(row)))).xlsx.writeBuffer();
    resolve(buffer);
  });
}

/**
 * Route to handle GET requests for generating an Excel file
 */
app.get('/generate-excel', async (req, res) => {
  try {
    // Simulate JSON data to be written to Excel
    const jsonData = [
      {
        name: 'John Doe',
        age: 30,
        city: 'New York'
      },
      {
        name: 'Jane Doe',
        age: 25,
        city: 'Los Angeles'
      }
    ];

    // Generate Excel file
    const excelBuffer = await generateExcelFromJson(jsonData);

    // Send the Excel file as a response
    res.setHeader('Content-Disposition', 'attachment; filename=generated-data.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.end(excelBuffer);
  } catch (error) {
    console.error('Error generating Excel:', error);
    res.status(500).send('Failed to generate Excel file.');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Excel Generator app listening at http://localhost:${port}`);
});
