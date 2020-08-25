"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var db = require("../data/connection.js");

module.exports = {
  add: add,
  find: find,
  findBy: findBy,
  findById: findById,
  update: update,
  remove: remove
};

function find() {
  return db('users').select('id', username).orderBy(id);
}

; // function findBy() {
//     return db('users as u')
//     .join( 'roles as r', 'r.id', 'u.role')
//     .where(filter)
//     .select('u.id', 'u.name', 'u.username', 'u.password', 'u.phone-number', 'r.name as role')
//     .orderBy('u.id')
// };

function findById(id) {
  return db('users').where({
    id: id
  }).first();
}

;

function add(user) {
  return db('users').insert(user).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        user = _ref2[0];

    return findById(user);
  });
}

;

function update(id, changes) {
  return db('users').where({
    id: id
  }).update(changes).then(function () {
    return findById(id);
  });
}

;

function remove(id) {
  return db('users').where({
    id: id
  })["delete"]();
}

;