const router = require('express').Router()
const {
  handleUploadedFile,
  getFile,
  deleteFile,
  testFile
} = require('../controllers/uploads.controller')

const { upload } = require('../config/GridFs.config')

router.post('/api/uploads/new', upload.single('file'), handleUploadedFile)
router.get('/api/uploads/:filename', getFile)
router.delete('/api/uploads/:filename', deleteFile)

module.exports = router
