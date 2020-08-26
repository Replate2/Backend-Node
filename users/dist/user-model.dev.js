"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var db = require("../data/connection.js");

var Foods = require('../replate2/foodItem-model.js');

module.exports = {
  find: find,
  findById: findById,
  findDonors: findDonors,
  findVolunteers: findVolunteers,
  findFooditems: findFooditems,
  // findBy,
  add: add,
  addFood: addFood,
  update: update,
  remove: remove
};

function find() {
  return db('users').select('id', 'name', 'username', 'role').orderBy('id');
}

;

function findById(id) {
  return db('users').where({
    id: id
  }).select('id', 'name', 'username', 'phone-number', 'role').first();
}

;

function findDonors() {
  return db('users').select('id', 'name', 'username', 'role').whereIn('role', ['donor', 'both']).orderBy('id');
}

function findVolunteers() {
  return db('users').select('id', 'name', 'username', 'role').whereIn('role', ['volunteer', 'both']).orderBy('id');
}

function findFooditems(id) {
  return db('volunteer_donor_foodItem').where({
    donor_id: id
  }).then(function (donorFoods) {
    console.log('donorFoods: ', donorFoods);
    var promises = [];
    donorFoods.map(function (food) {
      promises.push(Foods.where({
        id: food.food_id
      }));
    });
    return Promise.all(promises);
  });
}

; // function findBy(filter) {
//     return db('users as u')
//     .leftJoin( 'volunteers as v', 'u.id', 'v.user_id')
//     .leftJoin('donors as d', 'u.id', 'd.user_id',)
//     .where(filter)
//     .select('u.id', 'u.name', 'u.username', 'u.password', 'u.phone-number', 'v.id as volunteer', 'd.id as donor')
//     .orderBy('u.id')
// };
// function findBy(filter) {
//     return db("users as u")
//         .where(filter)
//         .select("u.id", "u.username", "u.password", "u.role")
//         .orderBy("u.id");
// };

function add(user) {
  return db('users').insert(user, "id").then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        userId = _ref2[0];

    console.log(userId);
    return findById(userId);
  });
}

;

function addFood(food, user_id) {
  return db('foodItems').insert(food).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        foodId = _ref4[0];

    return db('volunteer_donor_foodItem').insert({
      food_id: foodId,
      donor_id: user_id
    }).then(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          vdfId = _ref6[0];

      return Foods.findById(foodId).then(function (food) {
        return _objectSpread({}, food, {
          vdf_id: vdfId
        });
      });
    });
  });
}

;

function update(id, changes) {
  console.log(id, changes);
  return db('users').where({
    id: id
  }).update(changes).then(function (rv) {
    console.log(rv);
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