import React, { useState, useEffect } from 'react'
import './SinglePost.scss'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import CommentForm from './CommentForm'
import Comments from './Comments'

export default function SinglePost() {
  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState({})

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(res => res.json())
      .then(json => {
        if (json.ok) {
          console.log('Post', json.post)
          setPost(json.post)
        } else {
          console.log('Post not found')
        }
      })
  }, [])

  useEffect(() => {
    if (Object.keys(post).length > 0 && isLoading) {
      setIsLoading(false)
    }
  }, [post])

  const sendComment = comment => {
    return new Promise((resolve, reject) => {
      if (!comment.author) return reject('Please add your name')
      if (!comment.text) return reject('Please add a valid comment')

      fetch(`/api/posts/${post.slug}/comments`, {
        method: 'post',
        body: JSON.stringify(comment),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json.ok) {
            setPost(prev => ({ ...prev, comments: json.comments }))
            resolve(json.msg)
          } else {
            reject(json.msg)
          }
        })
        .catch(err => {
          console.log(err)
          reject('Could not get to the server')
        })
    })
  }

  if (isLoading) return <Loading />

  return (
    <div className="SinglePost-page">
      <div className="page-header">
        <h1>{post.title}</h1>
      </div>
      <div className="SinglePost-body">
        {post.blocks.map((block, index) => {
          if (block.type === 'paragraph')
            return (
              <p className="SinglePost-body-p" key={index}>
                {block.data.text}
              </p>
            )

          if (block.type === 'image')
            return (
              <div className="SinglePost-body-img" key={index}>
                <img src={block.data.file.url} alt="post" />
                <p className="SinglePost-body-img-caption">
                  {block.data.caption}
                </p>
              </div>
            )
        })}
      </div>
      <section className="SinglePost-comments-section">
        <h2 className="SinglePost-comments-title">Comments</h2>

        <CommentForm onSubmit={sendComment} />
        <Comments comments={post.comments} />
      </section>
    </div>
  )
}
