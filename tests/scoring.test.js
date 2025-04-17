const { calculatePoints } = require('../services/scoring');

describe('calculatePoints()', () => {
  // First test case
  it('should correctly calculate points for a simple receipt', () => {
    const receipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      total: '3.25',
      items: [
        { shortDescription: 'Pepsi - 12-oz', price: '1.25' },
        { shortDescription: 'Bread', price: '2.00' }
      ]
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(42);
  });

  // Second test case
  it('should correctly calculate points for the morning Walgreens receipt', () => {
    const receipt = {
      retailer: 'Walgreens',
      purchaseDate: '2022-01-02',
      purchaseTime: '08:13',
      total: '2.65',
      items: [
        { shortDescription: 'Pepsi - 12-oz', price: '1.25' },
        { shortDescription: 'Dasani', price: '1.40' }
      ]
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(15);
  });
});