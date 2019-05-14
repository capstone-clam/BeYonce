const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Screenshot = db.define('screenshot', {
  uri: {
    type: Sequelize.STRING
  }
})

module.exports = Screenshot
