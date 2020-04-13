const { Schema, model } = require('mongoose')

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      require: true,
    },
    blocks: {
      type: Array,
      require: true,
    },
    editorjs_v: String,
    comments: [
      {
        author: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: Date,
      },
    ],
  },
  { timestamps: true }
)

module.exports = model('post', PostSchema, 'posts')
