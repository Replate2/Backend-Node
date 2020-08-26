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
    return db('donors').select('id', 'name', 'username').orderBy('id');
};

function findById(id) {
    return db('donors').where({id}).first()
};

function findFooditems(id) {
    return db('volunteer_donor_foodItem').where({donor_id: id})
        .then((donorFoods) => {
            let promises = [];
            donorFoods.map(donorFoods => {
               promises.push(Foods.where({id: donorFoods.foodItem.id}))
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