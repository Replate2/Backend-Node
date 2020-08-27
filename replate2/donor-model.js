const db = require("../data/connection.js");
const Foods = require('../data/connection.js');

module.exports = {
    findById,
    add,
    update,
    remove
};

function findById(id) {
    return db('donors').where({id}).first()
};


// function findFooditems() {
//     return db('volunteer_donor_foodItem as vdf', 'vdf.donor_id', 'vdf.food_id')
//         .join('foodItems as f', 'f.id')
//         .join('donors as d', 'd.id')
//         .where(filter)
//         .select('f.name')
//         .orderBy('f.name')
// };

function add(donors) {
    return db('donors').insert(donors)
    .then(([donor]) => {
        return findById(donor);
    })
};

function update(id, changes) {
    return db('donors').where({id}).update(changes)
    .then(() => {
        return findById(id);
    })
};

function remove(id) {
    return db('donors').where({id}).delete();
};