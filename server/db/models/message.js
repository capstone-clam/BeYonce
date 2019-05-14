const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  message: {
    type: Sequelize.STRING
  }
})

module.exports = Message