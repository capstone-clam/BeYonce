const router = require('express').Router()
const {Category} = require('../db/models')
const {Inventory} = require('../db/models')

module.exports = router

//routes mounted on api/category

router.get('/', async (req, res, next) => {
  try {
    const allCategories = await Category.findAll()
    res.json(allCategories)
  } catch (err) {
    next(err)
  }
})


router.get('/:categoryId', async (req, res, next) => {
  try {
    const id = req.params.categoryId
    const singleCategory = await Category.findByPk(id, {
      include: [{model: Inventory}]
    })
    res.json(singleCategory)
  } catch (err) {
    next(err)
  }
})
