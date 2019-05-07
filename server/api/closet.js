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

router.get('/:inventoryId', async (req, res, next) => {
  try {
    const singleCategory = await Inventory.findAll({
      where: {
        id: req.params.inventoryId
      }
    })
    res.json(singleCategory[0])
  } catch (err) {
    next(err)
  }
})
