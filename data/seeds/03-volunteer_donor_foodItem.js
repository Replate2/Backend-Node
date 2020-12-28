
exports.seed = function(knex) {
    function getaFutureDate(days) {
      var result = new Date();
      result.setDate(result.getDate() + days);
      return result;
    }

    return knex('volunteer_donor_foodItem').insert([
      {
        "vol_id": 1,
        "donor_id": 2,
        "food_id": 1,
        "pickupTime": ""
      },
      {
        "vol_id": 4,
        "donor_id": 3,
        "food_id": 3,
        "pickupTime": getaFutureDate(10).toDateString(),
      },
      {
        "vol_id": 6,
        "donor_id": 5,
        "food_id": 5,
        "pickupTime": getaFutureDate(8).toDateString(),
      },
      {
        "vol_id": 1,
        "donor_id": 2,
        "food_id": 6,
        "pickupTime": ""
      },
      {
        "vol_id": 1,
        "donor_id": 2,
        "food_id": 2,
        "pickupTime": ""
      },
      {
        "vol_id": 4,
        "donor_id": 2,
        "food_id": 4,
        "pickupTime": getaFutureDate(12).toDateString(),
      }
    ]);
};
