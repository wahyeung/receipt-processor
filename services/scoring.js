function calculatePoints(receipt) {
    let points = 0;
  
    // Rule 1: 1 point for every alphanumeric character in the retailer name
    const retailer = receipt.retailer || '';
    const alphanumChars = retailer.match(/[a-zA-Z0-9]/g) || [];
    points += alphanumChars.length;
  
    // Rule 2: 50 points if the total is a round dollar amount with no cents
    const total = parseFloat(receipt.total);
    if (Number.isInteger(total)) {
        points += 50;
    }

    // Rule 3: 25 points if the total is a multiple of 0.25
    if (total % 0.25 === 0) {
        points += 25;
    }

    // Rule 4: 5 points for every two items
    const items = receipt.items || [];
    points += Math.floor(items.length / 2) * 5;

    // Rule 5: If item description length is a multiple of 3, add ceil(price * 0.2)
    for (const item of items) {
        const desc = item.shortDescription.trim();
        if (desc.length % 3 === 0) {
            const price =parseFloat(item.price);
            points += Math.ceil(price * 0.2);
        }
    }

    // Rule 6: 6 points if the purchase day is odd
    const dateStr = receipt.purchaseDate || '';
    const day = parseInt(dateStr.split('-')[2]);
    if (!isNaN(day) && day % 2 === 1) {
        points += 6;
    }

    // Rule 7: 10 points if puechase time is between 2:00pm and 4:00pm (exclusive)
    const timeStr = receipt.purchaseTime || '';
    const [hourStr, minStr] = timeStr.split(':');
    const hour = parseInt(hourStr);
    const minute = parseInt(minStr);

    if (!isNaN(hour) && !isNaN(minute)) {
        const totalMinutes = hour * 60 + minute;
        // 14:00 = 840 mins, 16:00 = 960 mins
        if (totalMinutes >= 840 && totalMinutes < 960) {
          points += 10;
        }
      }

      
    return points;
  }
  
  module.exports = { calculatePoints };