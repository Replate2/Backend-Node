
exports.seed = function(knex) {
    // Inserts seed entries
    return knex('foodItems').insert([
      {
        "name": "Fried chicken",
        "type": "entree",
        "quantity": "3 lbs"
      },
      {
      "name": " egg puffs",
      "type": "appetiser",
      "quantity": "4 lbs"
      },
      {
        "name": " tortilla chips",
        "type": "appetiser",
        "quantity": "3 lbs"
        },
        {
          "name": "Noodles",
          "type": "appetiser",
          "quantity": "4 lbs"
          },
          {
            "name": " chalupas",
            "type": "entree",
            "quantity": "4 lbs"
            },
            {
              "name": "apple pie",
              "type": "dessert",
              "quantity": "2 lbs"
              }
    ]);
};
