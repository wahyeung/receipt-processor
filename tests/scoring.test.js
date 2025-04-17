const { calculatePoints } = require('../services/scoring');

describe('calculatePoints()', () => {
  // Test case 1: basic receipt from Target
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

  // Test case 2: morning Walgreens receipt
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

  // Test case 3: total is a round dollar amount
  it('should add 50 points if total is an integer with no cents', () => {
    const receipt = {
      retailer: 'CVS',
      purchaseDate: '2022-01-10',
      purchaseTime: '11:00',
      total: '50.00',
      items: []
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(78); // 3 + 50 + 25
  });

  // Test case 4: time is between 2pm and 4pm
  it('should add 10 points if purchase time is between 2pm and 4pm', () => {
    const receipt = {
      retailer: 'RiteAid',
      purchaseDate: '2022-01-12',
      purchaseTime: '14:15',
      total: '20.25',
      items: []
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(42); // 7 + 25 + 10
  });

  // Test case 5: high coverage edge case
  it('should calculate correct score when many rules are triggered together', () => {
    const receipt = {
      retailer: 'TraderJoes123',
      purchaseDate: '2022-01-17',
      purchaseTime: '14:30',
      total: '100.00',
      items: [
        { shortDescription: 'Apples', price: '5.00' },
        { shortDescription: 'Banana', price: '2.50' },
        { shortDescription: 'Gum', price: '0.99' },
        { shortDescription: 'Soap', price: '3.00' }
      ]
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(117); // explained in previous breakdown
  });
});