const fs = require('fs')

var review
fs.readFile('./data/data.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err)
    return
  }
  try {
    review = jsonString
    console.log("Yelp Review is", review)
  } catch (err) {
    console.log('Error parsing JSON string:', err)
  }
})

var parsed_review = JSON.parse(review.replace(/\n/g, ''))

var map = new Map();
for (var k of Object.keys(parsed_review)) {
  map.set(k, parsed_review[k]);
}
