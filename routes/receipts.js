const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const scoringService = require('../services/scoring');
const store = require('../store/memoryStore');

// POST /receipts/process
// Accepts a receipt and returns a unique ID after scoring
router.post('/process', (req, res) => {
  const receipt = req.body;

  if (!receipt || !receipt.retailer || !receipt.total) {
    return res.status(400).json({ error: 'Missing required fields: retailer or total' });
  }
  
  const id = uuidv4();
  const points = scoringService.calculatePoints(receipt);

  store.save(id, points);
  res.json({ id });
  console.log(`Saved receipt ${id} with points: ${points}`);
});

// GET /receipts/:id/points
// Returns the total points for a given receipt ID
router.get('/:id/points', (req, res) => {
  const id = req.params.id;
  const points = store.get(id);

  console.log('Looking for ID:', id);
  console.log('Stored Points:', points);

  if (points === undefined) {
    return res.status(404).json({ error: 'Receipt not found' });
  }

  res.json({ points });
});

module.exports = router;