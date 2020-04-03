const fileCtrl = {}
const { GridFs } = require('../config/GridFs.config')
const Upload = require('../models/Upload')
let gfs
GridFs.then(handle => (gfs = handle))

fileCtrl.handleUploadedFile = (req, res) => {
  if (req.file) {
    const upload = new Upload({
      filename: req.file.filename,
      contentType: req.file.contentType,
      size: req.file.size,
      file_id: req.file.id,
      uploadDate: req.file.uploadDate,
      used: false
    })

    upload
      .save()
      .then(uploadSaved => {
        console.log('Upload', uploadSaved)
        return res.json({
          ok: true,
          msg: 'File uploaded successfully',
          file: uploadSaved
        })
      })
      .catch(err =>
        res.status(500).json({
          ok: false,
          msg: 'File saved but no record'
        })
      )
  } else {
    return res.status(500).json({
      ok: false,
      msg: 'No file uploaded'
    })
  }
}

fileCtrl.getFile = async (req, res) => {
  gfs
    .find({
      filename: req.params.filename
    })
    .toArray((err, files) => {
      if (err || !files || files.length === 0) {
        return res.status(404).json({
          ok: false,
          msg: 'no files exist'
        })
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res)
    })
}

fileCtrl.deleteFile = (req, res) => {
  if (req.params.filename) {
    gfs.files.findOneAndDelete(
      {
        filename: req.params.filename
      },
      (err, file) => {
        if (err) {
          return res.status(404).json({
            ok: false,
            msg: 'No file found'
          })
        }

        res.json({
          ok: true,
          msg: 'File deleted successfully',
          file
        })
      }
    )
  } else {
    res.status(400).json({
      ok: false,
      msg: 'Please, provide a filename'
    })
  }
}

fileCtrl.testFile = (req, res) => {
  console.log(req.body)
}

module.exports = fileCtrl
