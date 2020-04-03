const router = require('express').Router()
const { getConfig, updateConfig } = require('../controllers/blog.controller')

router.get('/api/blog/config', getConfig)
router.put('/api/blog/config', updateConfig)

module.exports = router
