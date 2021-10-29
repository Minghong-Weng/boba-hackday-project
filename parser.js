const fs = require('fs')

var review
fs.readFile('./data/Sharetea.json', 'utf8', (err, jsonString) => {
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
