const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Inventory = db.define('inventory', {
  filePath: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING,
    validate: {
        isUrl: true
    }
  },
  singleProduct: {
    type: Sequelize.STRING
  }
})

module.exports = Inventory

