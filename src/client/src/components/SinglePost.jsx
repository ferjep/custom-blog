import React, { useState, useEffect } from 'react'
import './SinglePost.scss'
import { useParams } from 'react-router-dom'
import Loading from './Loading'

export default function SinglePost() {
  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState({})

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(res => res.json())
      .then(json => {
        if (json.ok) {
          setPost(json.post)
          console.log(json.post)
        } else {
          console.log('Post not found')
        }
      })
  }, [])

  useEffect(() => {
    if (Object.keys(post).length > 0) {
      setIsLoading(false)
    }
  }, [post])

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
    </div>
  )
}
