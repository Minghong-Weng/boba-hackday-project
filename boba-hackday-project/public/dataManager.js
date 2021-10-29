class DataManager {
  static getRestaurant(id) {
    const data = {
      name: 'tan cha',
      yelp_url: 'url',
      yelp_rating: 5,
      shop_restaurant_mc_score: 5,
      reviews: [
        {
          text: 'great place',
          yelp_rating: 4,
          mycase_score: 4,
          id: 1,
        },
        {
          text: 'not a great place',
          yelp_rating: 1,
          mycase_score: 1,
          id:2,
        }
      ],
    }
    return data;
  }

}

export default DataManager;
