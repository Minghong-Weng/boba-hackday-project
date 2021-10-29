import SD_JSON_DATA from "./san_diego.json";
import IRVINE_JSON_DATA from "./irvine.json";

class DataManager {
  sdMap;
  irvineMap;

  constructor() {
    this.irvineMap = new Map();
    this.sdMap = new Map();

    for (var k of Object.keys(SD_JSON_DATA)) {
      this.sdMap.set(k, SD_JSON_DATA[k]);
    }

    for (var k of Object.keys(IRVINE_JSON_DATA)) {
      this.irvineMap.set(k, IRVINE_JSON_DATA[k]);
    }
  }

  static getInstance() {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  getSDRestaurant(id, includeReviews = false) {
    const restaurant_data = this.sdMap.get(String(id));
    if (!includeReviews) {
      const data = {
        id: restaurant_data.id,
        name: restaurant_data.name,
        yelp_url: restaurant_data.yelp_url,
        yelp_rating: restaurant_data.yelp_rating,
        shop_restaurant_mc_score: restaurant_data.shop_restaurant_mc_score,
      };
      return data;
    } else {
      return restaurant_data;
    }
  }

  getIrvineRestaurant(id, includeReviews = false) {
    const restaurant_data = this.irvineMap.get(String(id));
    if (!includeReviews) {
      const data = {
        id: restaurant_data.id,
        name: restaurant_data.name,
        yelp_url: restaurant_data.yelp_url,
        yelp_rating: restaurant_data.yelp_rating,
        shop_restaurant_mc_score: restaurant_data.shop_restaurant_mc_score,
      };
      return data;
    } else {
      return restaurant_data;
    }
  }
}

export default DataManager;
