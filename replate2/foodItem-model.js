const db = require("../data/connection.js");
const Donors = require('../data/connection.js');
const Volunteers = require('../data/connection.js');

module.exports = {
    find,
    findById,
    // findBy,
    // findDonors,
    // findVolunteers,
    update,
    remove
};


function find() {
    return db('foodItems').select('id', 'name', 'type', 'quantity').orderBy('id');
};

function findById(id) {
    return db('foodItems').where({id}).first()
    .then((count) => {
        return db('volunteer_donor_foodItem as vdf').where({
                food_id: id
            })
            .join('foodItems as f', 'f.id', 'vdf.food_id')
            .join('users as u', 'u.id', 'vdf.vol_id')
            .join('users as u2', 'u2.id', 'vdf.donor_id')
            .select('vdf.food_id as id','f.name as name','f.type as type', 'f.quantity as quantity', 'vdf.id as vdf_id', 'vdf.vol_id', 'u.name as volunteer_name', 'vdf.pickupTime', 'vdf.donor_id', 'u2.name as donor_name',
                 )
            .first()
            .then((vdf) => {
                //console.log('vdf:', vdf);
                return vdf;
            })
    })
};

// function findBy(filter) {
//     return db('foodItems').select('id', 'name', 'quantity').where(filter).first();
// };

// function findDonors(id) {
//     return db('volunteer_donor_foodItem').where({food_id: id})
//         .then((foodDonors) => {
//             let promises = [];
//             foodDonors.map(foodDonors => {
//                promises.push(Donors.where({id: foodDonors.donor.id}))
//             })
//             return Promise.all(promises);
//         })
// };

// function findDonors() {
//     return db('volunteer_donor_foodItem as vdf', 'vdf.donor_id', 'vdf.food_id')
//         .join('foodItems as f', 'f.id')
//         .join('donors as d', 'd.id')
//         .where(filter)
//         .select * from ('foodItems')
//         .orderBy('f.name')
// };

// function findVolunteers(id) {
//     return db('volunteer_donor_foodItem').where({food_id: id})
//         .then((foodVolunteers) => {
//             let promises = [];
//             foodVolunteers.map(foodVolunteers => {
//                promises.push(Volunteers.where({id: foodVolunteers.volunteer.id}))
//             })
//             return Promise.all(promises);
//         })
// };

function update(id, changes) {
    return db('foodItems').where({id}).update(changes)
    .then((rv) => {
        return findById(id);
    })
};

function remove(id) {
    return db('foodItems').where({id}).delete();
};