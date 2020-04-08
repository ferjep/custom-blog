const router = require('express').Router()
const {
  handleUploadedFile,
  getFile,
  deleteFile,
} = require('../controllers/uploads.controller')
const { verifyToken } = require('../controllers/admin.controller')

const { upload } = require('../config/GridFs.config')

router.post(
  '/api/uploads/new',
  verifyToken,
  upload.single('file'),
  handleUploadedFile
)
router.delete('/api/uploads/:filename', verifyToken, deleteFile) //Not used yet
router.get('/api/uploads/:filename', getFile)

module.exports = router
