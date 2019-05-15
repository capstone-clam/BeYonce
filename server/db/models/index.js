const db = require('../db')
const Inventory = require('./inventory')
const Category = require('./category')
const User = require('./user')
const Screenshot = require('./screenshot')

Inventory.belongsTo(Category)
Category.hasMany(Inventory)

module.exports = {
  db,
  Inventory,
  Category,
  User,
  Screenshot
}
