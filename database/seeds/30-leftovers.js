exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("leftovers")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("leftovers").insert([
        { id: 1, location_id: 1, name: "fresh tomato", quantity: 1 },
        { id: 2, location_id: 1, name: "onion", quantity: 6 },
        { id: 3, location_id: 1, name: "potato", quantity: 2 },
        { id: 4, location_id: 1, name: "garlic", quantity: 3 },
        { id: 5, location_id: 2, name: "fresh tomato", quantity: 5 },
        { id: 6, location_id: 2, name: "potato", quantity: 1 },
        { id: 7, location_id: 2, name: "garlic", quantity: 2 },
        { id: 8, location_id: 2, name: "lemons", quantity: 1 },
        { id: 9, location_id: 2, name: "steak", quantity: 2 },
        { id: 10, location_id: 2, name: "Fresh Spinach", quantity: 1 },
        { id: 11, location_id: 3, name: "fresh tomato", quantity: 11 },
        { id: 12, location_id: 3, name: "haddock", quantity: 1 },
        { id: 13, location_id: 3, name: "clams", quantity: 4 },
        { id: 14, location_id: 3, name: "steak", quantity: 1 },
        { id: 15, location_id: 3, name: "lemons", quantity: 2 },
      ]);
    });
};
