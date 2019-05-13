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

//routes mounted on api/category/id
// add by PK

router.get('/:categoryId', async (req, res, next) => {
  try {
    const singleCategory = await Category.findAll({
      where: {
        id: req.params.categoryId
      },
      include: [
        {
          model: Inventory
        }
      ]
    })
    res.json(singleCategory[0])
  } catch (err) {
    next(err)
  }
})
