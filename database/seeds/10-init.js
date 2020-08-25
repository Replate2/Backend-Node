exports.seed = async function (knex) {
  // await knex("leftovers").truncate();
  // await knex("locations").truncate();
  // await knex("users").truncate();
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "Jimmy Eatfood", password: "JimHungry4334" },
      ]);
    });
};
