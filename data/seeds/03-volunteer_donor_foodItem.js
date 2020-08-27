
exports.seed = function(knex) {
    return knex('volunteer_donor_foodItem').insert([
      {
        "vol_id": 1,
        "donor_id": 2,
        "food_id": 1,
        "pickupTime": "5pm Sep 1st, 2020"
      },
      {
        "vol_id": 4,
        "donor_id": 3,
        "food_id": 3,
        "pickupTime": "5pm Aug 1st, 2020"
      },
      {
        "vol_id": 6,
        "donor_id": 5,
        "food_id": 5,
        "pickupTime": "5pm July 1st, 2020"
      },
      {
        "vol_id": 1,
        "donor_id": 2,
        "food_id": 1,
        "pickupTime": "5pm Sep 11th, 2020"
      },
      {
        "vol_id": 1,
        "donor_id": 2,
        "food_id": 2,
        "pickupTime": "5pm Sep 21st, 2020"
      },
      {
        "vol_id": 4,
        "donor_id": 2,
        "food_id": 4,
        "pickupTime": "5pm Sep 15th, 2020"
      }
    ]);
};
