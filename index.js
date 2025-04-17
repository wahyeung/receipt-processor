// Import required modules
const express = require('express');
const app = express();
const receiptsRouter = require('./routes/receipts');

// Middleware to parse JSON bodies
app.use(express.json());

// Root welcome route 
app.get('/', (req, res) => {
  res.send('🎉 Receipt Processor API is live! Visit /receipts to get started.');
});

// Route all /receipts requests to the receiptsRouter
app.use('/receipts', receiptsRouter);

// Start server on dynamic port for deployment (or 3000 for local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});