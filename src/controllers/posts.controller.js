const postCtrl = {}
const mongoose = require('mongoose')
const Post = require('../models/Post')
const Upload = require('../models/Upload')
const { GridFs } = require('../config/GridFs.config')
let gfs
GridFs.then(handler => (gfs = handler))

//CRUD post

postCtrl.createPost = (req, res) => {
  const post = new Post({ ...req.body })

  post
    .save()
    .then(post => {
      post.blocks.map(async block => {
        if (block.type === 'image') {
          await Upload.findOneAndUpdate(
            { filename: block.data.file.filename },
            { used: true, postSlug: post.slug }
          )
        }
      })

      console.log(`Post created: "${post.title}" `)
      // console.log(`Post created`, post)

      return res.json({
        ok: true,
        msg: 'Post created',
        post,
      })
    })
    .catch(err => {
      console.log('Error saving post', err)
      res.status(500).json({
        ok: false,
        msg: 'Error saving post',
      })
    })
}

postCtrl.getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }, { _id: 0 })

  if (post) {
    console.log(`Post found: "${post.title}" `)
    return res.json({
      ok: true,
      msg: 'Post found',
      post,
    })
  } else {
    console.log('Post not found', post)
    return res.status(404).json({ ok: false, msg: 'Post not found' })
  }
}

postCtrl.updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    {
      new: true,
    }
  )

  if (post) {
    //console.log('Post Updated!!!', post)
    console.log(`Post Updated: "${post.title}" `)
    return res.json({
      ok: true,
      msg: 'Post actualizado',
      post,
    })
  } else {
    console.log('Post not found', post)

    return res.status(404).json({ ok: false, msg: 'Post not found' })
  }
}

postCtrl.deletePost = async (req, res) => {
  const post = await Post.findOneAndRemove({ slug: req.params.slug })

  if (post) {
    console.log(`Post deleted: "${post.title}" `)
    // console.log('Post deleted', post)

    const uploads = await Upload.find({ postSlug: post.slug })

    if (uploads) {
      uploads.map(upload => {
        gfs.delete(upload.file_id, err => {
          if (err)
            return console.log('Error deleting file from post delete', err)
          console.log('inside function', upload)
          Upload.findByIdAndDelete(upload.id, (err, doc) => {
            if (err)
              return console.log('couldnt delete upload record', err, doc)
          })
        })
      })

      console.log('Uploads from post deleted', uploads)
    }

    return res.json({
      ok: true,
      msg: 'Post deleted',
      post,
    })
  } else {
    console.log('Post not found', post)
    return res.json({
      ok: false,
      msg: 'Post not found',
    })
  }
}

// Posts

postCtrl.getPosts = async (req, res) => {
  const skip = Number(req.query.skip) || 0
  const limit = Number(req.query.limit) || 20
  const sort =
    req.query.sort ||
    (() => {
      const sortReq = req.query.sort

      if (sortReq === 'old') return { createdAt: 1 }
      return { createdAt: -1 } //Sort by date
    })()

  console.log('Queries:', { skip, limit, sort })

  let posts = await Post.find({}, { _id: 0 }).sort(sort).skip(skip).limit(limit)

  if (posts) {
    posts = posts.map(post => {
      let resume = ''
      let mainImage
      const resumeLimit = 150

      post.blocks.some(block => {
        if (block.type === 'image' && !mainImage) {
          mainImage = block.data.file.url
        } else if (resume.length < resumeLimit) {
          resume += resume ? ' ' + block.data.text : block.data.text
          if (resume.length > resumeLimit) {
            resume = resume.substring(0, resumeLimit) + '...'
          }
        }

        return mainImage && resume.length >= resumeLimit ? true : false
      })

      return {
        ...post._doc,
        resume,
        mainImage,
        blocks: undefined,
      }
    })

    res.json({ ok: true, msg: 'Posts requested successfully', posts })
  } else {
    res.json({ ok: false, msg: "Couldn't find any post" })
  }
}

// Comments

postCtrl.addComment = async (req, res) => {
  const { author, text } = req.body

  if (!author || !text) {
    return res
      .status(400)
      .json({ ok: false, msg: 'author or text field empty' })
  }

  try {
    const { comments } = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      {
        $push: {
          comments: {
            $each: [{ author, text, createdAt: Date.now() }],
            $position: 0,
          },
        },
      },
      { new: true }
    )

    if (comments) {
      return res.json({
        ok: true,
        msg: 'Comment added',
        comments,
      })
    }
    return res.json({ ok: false, msg: 'Post not found' })
  } catch (err) {
    console.log('Comment error', err)
    return res.status(500).json({ ok: false, msg: 'Something went wrong' })
  }
}
postCtrl.deleteComment = async (req, res) => {
  const { slug, id } = req.params

  try {
    const { comments } = await Post.findOneAndUpdate(
      { slug },
      { $pull: { comments: { _id: id } } },
      { new: true }
    )

    if (Array.isArray(comments)) {
      if (comments.some(comment => comment._id.toString() === id)) {
        return res
          .status(500)
          .json({ ok: false, msg: 'Could not delete the comment' })
      } else {
        console.log('Comment deleted')
        return res.json({ ok: true, msg: 'Comment deleted', comments })
      }
    }

    return res.json({ ok: false, msg: 'Post not found' })
  } catch (err) {
    console.log('Error deleting comment', err)
    return res
      .status(500)
      .json({ ok: false, msg: 'Something went wrong with the server' })
  }
}
postCtrl.getComments = () => {}

module.exports = postCtrl
