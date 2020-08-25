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