// Import required modules
const express = require('express');
const app = express();
const receiptsRouter = require('./routes/receipts');

// Middleware to parse JSON bodies
app.use(express.json());

// Route all /receipts requests to the receiptsRouter
app.use('/receipts', receiptsRouter);

// Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});