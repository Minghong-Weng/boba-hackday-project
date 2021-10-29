import SD_JSON_DATA from './data.json'
import IRVINE_JSON_DATA from './irvine.json'

class DataManager {
  
  static getSDRestaurant(id) {

    const map = new Map();
    for (var k of Object.keys(SD_JSON_DATA)) {
      map.set(k, SD_JSON_DATA[k]);
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

  static getIrvineRestaurant(id) {

    const map = new Map();
    for (var k of Object.keys(IRVINE_JSON_DATA)) {
      map.set(k, IRVINE_JSON_DATA[k]);
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
