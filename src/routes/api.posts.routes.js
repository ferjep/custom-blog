const router = require('express').Router()
const {
  createPost,
  updatePost,
  getPost,
  deletePost,
  getPosts,
  addComment,
  deleteComment,
} = require('../controllers/posts.controller')
const { verifyToken } = require('../controllers/admin.controller')

// CRUD post

router.post('/api/posts/new', verifyToken, createPost) //Create
router.put('/api/posts/:slug', verifyToken, updatePost) //Update
router.delete('/api/posts/:slug', verifyToken, deletePost) //Delete
router.get('/api/posts/:slug', getPost) // Read

// Posts

router.get('/api/posts', getPosts)

// Comments
router.post('/api/posts/:slug/comments', addComment)
router.delete('/api/posts/:slug/comments/:id', verifyToken, deleteComment)

/*Queries: 
  start : the index where mongoose will start returning from || 0
  limit: how many documents will be returned from "start" || 10
  sort: how documents will be sorted: by "date" || null
*/

module.exports = router
