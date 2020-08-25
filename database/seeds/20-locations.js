exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("locations")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("locations").insert([
        { id: 1, owned_by: 1, name: "Grande Lupe's" },
        { id: 2, owned_by: 1, name: "Big Ale's" },
        { id: 3, owned_by: 1, name: "Marianne's" },
      ]);
    });
};
