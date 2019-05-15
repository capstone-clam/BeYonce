const router = require('express').Router()
const {Screenshot} = require('../db/models')
module.exports = router

router.get('/screenshot', async (req, res, next) => {
  try {
    const allScreenshots = await Screenshot.findAll()
    res.json(allScreenshots)
  } catch (error) {
      next(error)
  }
})


router.post('/screenshot',  async (req, res, next) => {
  try {
    const newScreenshot = await Screenshot.create(req.body)
    res.json(newScreenshot)
    } catch (error) {
        next(error)
    }
})