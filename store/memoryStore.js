const receiptPoints = {};

function save(id, points) {
  receiptPoints[id] = points;
}

function get(id) {
  return receiptPoints[id];
}

module.exports = { save, get };