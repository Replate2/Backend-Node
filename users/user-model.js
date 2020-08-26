const db = require("../data/connection.js");

const Foods = require('../replate2/foodItem-model.js');

module.exports = {
    find,
    findById,
    findDonors,
    findVolunteers,
    findFooditems,
    // findBy,
    add,
    addFood,
    update,
    remove
};


function find() {
    return db('users').select('id', 'name', 'username', 'role').orderBy('id');
};

function findById(id) {
    return db('users').where({id}).select('id', 'name', 'username', 'phone-number', 'role').first();
};

function findDonors() {
    return db('users').select('id', 'name', 'username', 'role').whereIn('role', ['donor', 'both']).orderBy('id');
}

function findVolunteers() {
    return db('users').select('id', 'name', 'username', 'role').whereIn('role', ['volunteer', 'both']).orderBy('id');
}

function findFooditems(id) {
    return db('volunteer_donor_foodItem')
        .where({donor_id: id})
        .then((donorFoods) => {
            console.log('donorFoods: ', donorFoods)
            let promises = [];
            donorFoods.map(food => {
               promises.push(Foods.where({id: food.food_id}))
            })
            return Promise.all(promises);
        })
};
// function findBy(filter) {
//     return db('users as u')
//     .leftJoin( 'volunteers as v', 'u.id', 'v.user_id')
//     .leftJoin('donors as d', 'u.id', 'd.user_id',)
//     .where(filter)
//     .select('u.id', 'u.name', 'u.username', 'u.password', 'u.phone-number', 'v.id as volunteer', 'd.id as donor')
//     .orderBy('u.id')
// };

// function findBy(filter) {
//     return db("users as u")
//         .where(filter)
//         .select("u.id", "u.username", "u.password", "u.role")
//         .orderBy("u.id");
// };

function add(user) {
    return db('users').insert(user, "id")
    .then(([userId]) => {
        console.log(userId);
        return findById(userId);
    })
};

function addFood(food, user_id) {
    return db('foodItems').insert(food)
    .then(([foodId]) => {
        return db('volunteer_donor_foodItem').insert({
            food_id: foodId,
            donor_id: user_id
        })
        .then(([vdfId]) => {
            return Foods.findById(foodId).then(food => {
                return {...food, vdf_id: vdfId}
            })
        })
    })
};

function update(id, changes) {
    console.log(id, changes);
    return db('users').where({id}).update(changes)
    .then((rv) => {
        console.log(rv);
        return findById(id);
    })
};

function remove(id) {
    return db('users').where({id}).delete();
};