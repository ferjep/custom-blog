const router = require('express').Router()
const {
  createPost,
  updatePost,
  getPost,
  deletePost,
  getPosts
} = require('../controllers/posts.controller')

// CRUD post

router.post('/api/posts/new', createPost) //Create
router.get('/api/posts/:slug', getPost) // Read
router.put('/api/posts/:slug', updatePost) //Update
router.delete('/api/posts/:slug', deletePost) //Delete

// Posts

router.get('/api/posts', getPosts)
/*Queries: 
  start : the index where mongoose will start returning from || 0
  limit: how many documents will be returned from "start" || 10
  sort: how documents will be sorted: by "date" || null
*/

module.exports = router
