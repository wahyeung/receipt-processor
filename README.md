🔗 **Live API**: [https://receipt-api-6uux.onrender.com](https://receipt-api-6uux.onrender.com)  
→ Visit root path `/` to verify deployment success.  
📂 **GitHub Repo**: [https://github.com/wahyeung/receipt-processor](https://github.com/wahyeung/receipt-processor)

> Deployed with Render. Built for the **Fetch Backend Engineer Apprenticeship** challenge.

# Receipt Processor API

A lightweight backend service that accepts receipt data, calculates points based on specific rules, and allows querying the total points by receipt ID.  
Built using **Node.js**, **Express**, and tested with **Jest** & **Supertest**.

---

## 📦 Tech Stack

- Node.js
- Express.js
- In-memory storage (no database)
- UUID for unique ID generation

---

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or start normally
npm start
```

## 🔄 Endpoints

### POST /receipts/process

Submits a receipt and returns a unique ID.

### GET /receipts/:id/points

Returns the total points for a submitted receipt.

## 🧮 Scoring Rules

1. 1 point for each alphanumeric character in the retailer name.
2. +50 points if the total is a round dollar amount.
3. +25 points if the total is a multiple of 0.25.
4. +5 points for every two items.
5. +ceil(price * 0.2) for items whose trimmed description length is a multiple of 3.
6. +6 points if purchase day is odd.
7. +10 points if purchase time is between 2:00pm and 4:00pm.

---

## 🧪 Testing

Unit tests are written using [Jest](https://jestjs.io/) to verify the correctness of the scoring logic.

To run tests:

```bash
npm test
```
You can find test cases in:
	•	tests/scoring.test.js: unit tests for all scoring rules (1-7), including edge cases
	•	tests/receipts.test.js: integration test for API input validation

A total of 6 tests are included and run automatically via GitHub Actions.

🗂 [`postman/receipt-processor-collection.json`](postman/receipt-processor-collection.json)


## 🔐 Error Handling

If the request body is missing required fields such as `retailer` or `total`,  
the API will respond with a clear error message and a `400 Bad Request` status.

### Example:

```http
POST /receipts/process
Content-Type: application/json

{}
```
### Response:

```json
{
  "error": "Missing required fields: retailer or total"
}
```

This ensures that invalid payloads are gracefully rejected and users receive helpful feedback.

## ✅ Continuous Integration

This project uses **GitHub Actions** for automated testing.  
Every push to `main` will automatically run the Jest test suite via CI.

You can see the workflow file in:
`.github/workflows/node.js.yml`