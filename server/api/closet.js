const router = require('express').Router()
const {Inventory} = require('../db/models')
module.exports = router

//routes mounted on api/closet

router.get('/', async (req, res, next) => {
  try {
    const allInventory = await Inventory.findAll()
    res.json(allInventory)
  } catch (err) {
    next(err)
  }
})

router.get('/:categoryId', async (req, res, next) => {
  try {
    const singleCategory = await Inventory.findAll({
      where: {
        categoryId: req.params.categoryId
      }
    })
    res.json(singleCategory)
  } catch (err) {
    next(err)
  }
})
