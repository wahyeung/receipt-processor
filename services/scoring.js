function calculatePoints(receipt) {
    let points = 0;
  
    // Rule 1: 1 point for every alphanumeric character in the retailer name
    const retailer = receipt.retailer || '';
    const alphanumChars = retailer.match(/[a-zA-Z0-9]/g) || [];
    const rule1Points = alphanumChars.length;
    points += rule1Points;
    
  
    // Rule 2: 50 points if the total is a round dollar amount with no cents
    const total = parseFloat(receipt.total);
    const rule2Points = Number.isInteger(total) ? 50 : 0;
    points += rule2Points;
    
  
    // Rule 3: 25 points if the total is a multiple of 0.25
    const rule3Points = total % 0.25 === 0 ? 25 : 0;
    points += rule3Points;
    
  
    // Rule 4: 5 points for every two items
    const items = receipt.items || [];
    const rule4Points = Math.floor(items.length / 2) * 5;
    points += rule4Points;
    
    // Rule 5: bonus for items with desc length % 3 === 0
    let rule5Points = 0;
    for (const item of items) {
      const desc = item.shortDescription.trim();
      if (desc.length % 3 === 0) {
        const price = parseFloat(item.price);
        rule5Points += Math.ceil(price * 0.2);
      }
    }
    points += rule5Points;
    
  
    // Rule 6: 6 points if the purchase day is odd
    const dateStr = receipt.purchaseDate || '';
    const day = parseInt(dateStr.split('-')[2]);
    const rule6Points = (!isNaN(day) && day % 2 === 1) ? 6 : 0;
    points += rule6Points;
    
  
    // Rule 7: 10 points if purchase time is between 2:00pm and 4:00pm
    const timeStr = receipt.purchaseTime || '';
    const [hourStr, minStr] = timeStr.split(':');
    const hour = parseInt(hourStr);
    const minute = parseInt(minStr);
    let rule7Points = 0;
    if (!isNaN(hour) && !isNaN(minute)) {
      const totalMinutes = hour * 60 + minute;
      if (totalMinutes >= 840 && totalMinutes < 960) {
        rule7Points = 10;
      }
    }
    points += rule7Points;
    
    return points;
  }
  
  module.exports = { calculatePoints };