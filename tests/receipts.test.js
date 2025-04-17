const request = require('supertest');
const express = require('express');
const receiptsRouter = require('../routes/receipts');

const app = express();
app.use(express.json());
app.use('/receipts', receiptsRouter);

describe('POST /receipts/process - input validation', () => {
  it('should return 400 if retailer or total is missing', async () => {
    const response = await request(app)
      .post('/receipts/process')
      .send({
        // missing 'retailer'
        total: "3.00",
        items: [],
        purchaseDate: "2022-01-01",
        purchaseTime: "12:00"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});