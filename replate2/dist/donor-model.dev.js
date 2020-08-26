"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var db = require("../data/connection.js");

var Foods = require('../data/connection.js');

module.exports = {
  find: find,
  findById: findById,
  findFooditems: findFooditems,
  add: add,
  update: update,
  remove: remove
};

function find() {
  return db('donors').select('id', 'name', 'username').orderBy('id');
}

;

function findById(id) {
  return db('donors').where({
    id: id
  }).first();
}

;

function findFooditems(id) {
  return db('volunteer_donor_foodItem').where({
    donor_id: id
  }).then(function (donorFoods) {
    var promises = [];
    donorFoods.map(function (donorFoods) {
      promises.push(Foods.where({
        id: donorFoods.foodItem.id
      }));
    });
    return Promise.all(promises);
  });
}

; // function findFooditems() {
//     return db('volunteer_donor_foodItem as vdf', 'vdf.donor_id', 'vdf.food_id')
//         .join('foodItems as f', 'f.id')
//         .join('donors as d', 'd.id')
//         .where(filter)
//         .select('f.name')
//         .orderBy('f.name')
// };

function add(donors) {
  return db('donors').insert(donors).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        donor = _ref2[0];

    return findById(donor);
  });
}

;

function update(id, changes) {
  return db('donors').where({
    id: id
  }).update(changes).then(function () {
    return findById(id);
  });
}

;

function remove(id) {
  return db('donors').where({
    id: id
  })["delete"]();
}

;