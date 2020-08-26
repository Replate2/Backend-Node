const db = require("../data/connection.js");
const Foods = require('../data/connection.js');

module.exports = {
   
    find,
    findById,
    findFooditems,
    add,
    update,
    remove
};


function find() {
    return db('volunteers as v', 'v.id')
    .join('users as u', 'u.id', 'v.user_id')
    .select('v.id', 'v.user_id', 'u.name', 'u.username')
    .orderBy('v.id');
};

function findById(id) {
    return db('volunteers').where({id}).first()
};

function findFooditems(id) {
    return db('volunteer_donor_foodItem').where({volunteer_id: id})
        .then((volunteerFoods) => {
            let promises = [];
            volunteerFoods.map(volunteerFoods => {
               promises.push(Foods.where({id: volunteerFoods.foodItem.id}))
            })
            return Promise.all(promises);
        })
};

// function findFooditems() {
//     return db('volunteer_donor_foodItem as vdf', 'vdf.donor_id', 'vdf.food_id')
//         .join('foodItems as f', 'f.id')
//         .join('donors as d', 'd.id')
//         .where(filter)
//         .select('f.name')
//         .orderBy('f.name')
// };

function add(volunteer) {
    return db('volunteers').insert(volunteer)
    .then(([volunteer]) => {
        return findById(volunteer);
    })
};

function update(id, changes) {
    return db('volunteers').where({id}).update(changes)
    .then(() => {
        return findById(id);
    })
};

function remove(id) {
    return db('volunteers').where({id}).delete();
};