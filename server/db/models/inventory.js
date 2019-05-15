const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Inventory = db.define('inventory', {
  item: {
    type: Sequelize.STRING
  },
  filePath: {
    type: Sequelize.STRING
  },
  imageFilePath: {
    type: Sequelize.STRING,
    defaultValue: null
  }
})

module.exports = Inventory
