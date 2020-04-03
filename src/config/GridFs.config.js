const crypto = require('crypto')
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const db_conn = require('../database')

const bucketName = 'files'

//storage
const storage = new GridFsStorage({
  db: db_conn,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename,
          bucketName
        }
        resolve(fileInfo)
      })
    })
  }
})

module.exports = {
  upload: multer({ storage }),
  GridFs: new Promise((resolve, reject) => {
    db_conn.once('open', () => {
      resolve(new mongoose.mongo.GridFSBucket(db_conn.db, { bucketName }))
    })
  })
}
