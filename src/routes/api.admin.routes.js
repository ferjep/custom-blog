const router = require('express').Router()
const {
  login,
  logout,
  verifyToken,
  loggedIn,
} = require('../controllers/admin.controller')

router.post('/api/admin/login', login)
router.get('/api/admin/logout', logout)
router.get('/api/admin/verify', verifyToken, loggedIn)

module.exports = router
