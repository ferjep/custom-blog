const router = require('express').Router()
const { login, logout } = require('../controllers/admin.controller')

router.post('/api/admin/login', login)
router.post('/api/admin/logout', logout)

module.exports = router
