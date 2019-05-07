const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Category
