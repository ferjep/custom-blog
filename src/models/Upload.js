const { Schema, model } = require('mongoose')

const UploadsSchema = new Schema({
  filename: {
    type: String,
    required: true,
    unique: true
  },
  file_id: {
    type: Schema.Types.ObjectId,
    require: true
  },
  contentType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: Date,
    required: true
  },
  used: {
    type: Boolean,
    required: true
  },
  postSlug: String
})

module.exports = model('upload', UploadsSchema, 'uploads')
