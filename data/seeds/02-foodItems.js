
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').truncate()
    .then(function () {
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
            "name": " egg puffs",
            "type": "appetiser",
            "quantity": "4 lbs"
            },
            {
              "name": " chalupas",
              "type": "entree",
              "quantity": "4 lbs"
              },
              {
                "name": " pie",
                "type": "dessert",
                "quantity": "2 lbs"
                }
      ]);
    });
};
