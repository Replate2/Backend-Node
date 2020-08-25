const db = require("../data/connection.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
};


function find() {
    return db('users').select('id', 'name', 'username').orderBy('id');
};

function findBy(filter) {
    return db('users as u')
    .leftJoin( 'volunteers as v', 'u.id', 'v.user_id')
    .leftJoin('donors as d', 'u.id', 'd.user_id',)
    .where(filter)
    .select('u.id', 'u.name', 'u.username', 'u.password', 'u.phone-number', 'v.id as volunteer', 'd.id as donor')
    .orderBy('u.id')
};

function findById(id) {
    return db('users').where({id}).first()
};

function add(user) {
    return db('users').insert(user)
    .then(([user]) => {
        return findById(user);
    })
};

// function addUser(user){
//     const [id] = await db('users').insert(user.userinfo)
//     db('roles').insert({userID: id, role: user.role})
// };

function update(id, changes) {
    return db('users').where({id}).update(changes)
    .then(() => {
        return findById(id);
    })
};

function remove(id) {
    return db('users').where({id}).delete();
};