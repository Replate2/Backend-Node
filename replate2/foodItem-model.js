const db = require("../data/connection.js");
const Donors = require('../data/connection.js');
const Volunteers = require('../data/connection.js');

module.exports = {
    find,
    findById,
    findDonors,
    findVolunteers,
    update,
    remove
};


function find() {
    return db('foodItems').select('id', 'name', 'quantity').orderBy('id');
};

function findById(id) {
    return db('foodItems').where({id}).first()
};

function findDonors(id) {
    return db('volunteer_donor_foodItem').where({food_id: id})
        .then((foodDonors) => {
            let promises = [];
            foodDonors.map(foodDonors => {
               promises.push(Donors.where({id: foodDonors.donor.id}))
            })
            return Promise.all(promises);
        })
};

// function findDonors() {
//     return db('volunteer_donor_foodItem as vdf', 'vdf.donor_id', 'vdf.food_id')
//         .join('foodItems as f', 'f.id')
//         .join('donors as d', 'd.id')
//         .where(filter)
//         .select * from ('foodItems')
//         .orderBy('f.name')
// };

function findVolunteers(id) {
    return db('volunteer_donor_foodItem').where({food_id: id})
        .then((foodVolunteers) => {
            let promises = [];
            foodVolunteers.map(foodVolunteers => {
               promises.push(Volunteers.where({id: foodVolunteers.volunteer.id}))
            })
            return Promise.all(promises);
        })
};

function update(id, changes) {
    return db('foodItems').where({id}).update(changes)
    .then(() => {
        return findById(id);
    })
};

function remove(id) {
    return db('foodItems').where({id}).delete();
};