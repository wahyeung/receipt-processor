const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator'); // Import validation library
const router = express.Router();
const scoringService = require('../services/scoring');
const store = require('../store/memoryStore');

// POST /receipts/process
// Validates receipt data, calculates points, and stores the result
router.post(
  '/process',
  [
    // Validation rules
    body('retailer').isString().notEmpty().withMessage('Retailer must be a non-empty string'),
    body('purchaseDate').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('PurchaseDate must be in YYYY-MM-DD format'),
    body('purchaseTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('PurchaseTime must be in HH:MM format'),
    body('total').isNumeric().custom(value => parseFloat(value) >= 0).withMessage('Total must be a non-negative number'),
    body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
    body('items.*.shortDescription').isString().notEmpty().withMessage('Each item must have a non-empty shortDescription'),
    body('items.*.price').isNumeric().custom(value => parseFloat(value) >= 0).withMessage('Each item must have a non-negative price')
  ],
  (req, res) => {
    const errors = validationResult(req);

    // Return 400 if validation fails
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Process valid receipt
    const receipt = req.body;
    const id = uuidv4();
    const points = scoringService.calculatePoints(receipt);

    store.save(id, points);
    res.json({ id });
    console.log(`Saved receipt ${id} with points: ${points}`);
  }
);

// GET /receipts/:id/points
// Returns the total points awarded for a receipt ID
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