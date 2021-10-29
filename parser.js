const fs = require('fs')

fs.readFile('./data/restraunt.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err)
    return
  }
  try {
    const yelp_review = JSON.parse(jsonString)
    console.log("Yelp Review is", yelp_review)
  } catch (err) {
    console.log('Error parsing JSON string:', err)
  }
})
