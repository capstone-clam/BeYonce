const Inventory = require('./inventory')
const Category = require('./category')
const User = require('./user')

Category.hasMany(Inventory)
Inventory.belongsTo(Category)

module.exports = {
  Inventory,
  Category,
  User
}
