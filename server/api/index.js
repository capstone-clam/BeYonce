const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/closet', require('./closet'))
router.use('/category', require('./category'))
router.use('./screenshot', require('./screenshot'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
