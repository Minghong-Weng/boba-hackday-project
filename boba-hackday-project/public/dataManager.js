class DataManager {
  static getRestaurant(id) {
    const fs = require('fs')

    var review
    fs.readFile('../../data/data.json', 'utf8', (err, jsonString) => {
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

    const map = new Map();
    for (var k of Object.keys(parsed_review)) {
      map.set(k, parsed_review[k]);
    }

    const restaurant_data = map.get(String(id));
    const data = {
      name: restaurant_data.name,
      yelp_url: restaurant_data.yelp_url,
      yelp_rating: restaurant_data.yelp_rating,
      shop_restaurant_mc_score: restaurant_data.shop_restaurant_mc_score,
      reviews: restaurant_data.reviews,
    }
    return data;
  }
}

export default DataManager;
