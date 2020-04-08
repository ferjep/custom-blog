const router = require('express').Router()
const { getConfig, updateConfig } = require('../controllers/blog.controller')
const { verifyToken } = require('../controllers/admin.controller')

router.get('/api/blog/config', getConfig)
router.put('/api/blog/config', verifyToken, updateConfig)

module.exports = router
