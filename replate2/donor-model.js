const db = require("../data/connection.js");
const Foods = require('../data/connection.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    findFooditems,
    update,
    remove
};


function find() {
    return db('users').select('id', username).orderBy(id);
};

function findBy() {
    return db('users as u')
    .join( 'roles as r', 'r.id', 'u.role')
    .where(filter)
    .select('u.id', 'u.name', 'u.username', 'u.password', 'u.phone-number', 'r.name as role')
    .orderBy('u.id')
};

function findById(id) {
    return db('users').where({id}).first()
};

function findFooditems() {
    return db('volunteer_donor_foodItem as vdf', 'vdf.donor_id', 'vdf.food_id')
        .join('foodItems as f', 'f.id')
        .join('donors as d', 'd.id')
        .where(filter)
        .select('f.name')
        .orderBy('f.name')
};

function add(user) {
    return db('users').insert(user)
    .then(([user]) => {
        return findById(user);
    })
};

function update(id, changes) {
    return db('users').where({id}).update(changes)
    .then(() => {
        return findById(id);
    })
};

function remove(id) {
    return db('users').where({id}).delete();
};