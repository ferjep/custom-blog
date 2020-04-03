import React, { useState, useEffect, useContext, useRef } from 'react'
import './Posts.scss'
import { MessageContext } from '../context/MessageContext'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import PostCard from './PostCard'

const queryDefaults = {
  skip: 0,
  limit: 10,
  sort: 'date'
}

export default function PostsList({ admin }) {
  const setMessage = useContext(MessageContext)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [mobile, setMobile] = useState(false)
  const component = useRef(null)

  const handleMobile = () => {
    if (component.current.offsetWidth < 500) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }

  useEffect(() => {
    fetchPosts()
      .then(data => {
        setPosts(data)
      })
      .catch(err =>
        setMessage({ type: 'error', text: "Couldn't get the posts" })
      )
  }, [])

  useEffect(() => {
    if (posts[0]) {
      console.log('Posts', posts)
      setIsLoading(false)
    }
  }, [posts])

  useEffect(() => {
    if (!isLoading) {
      handleMobile()
      window.addEventListener('resize', handleMobile)

      return () => {
        window.removeEventListener('resize', handleMobile)
      }
    }
  }, [isLoading])

  return !isLoading ? (
    <div className="Posts-page" ref={component}>
      <div className="page-header">
        {admin ? (
          <>
            <h1>Create new post</h1>{' '}
            <Link className="btn" to="/admin/posts/new">
              Create
            </Link>
          </>
        ) : (
          <h1>Lastest Posts</h1>
        )}
      </div>

      <div className="Posts-wrapper">
        {posts.map(post => (
          <PostCard post={post} key={post.slug} mobile={mobile} admin={admin} />
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  )
}

const fetchPosts = queryObj => {
  return new Promise((resolve, reject) => {
    let fetchingUrl = '/api/posts'
    let queriesArray = []
    const { skip, limit, sort } = queryObj || {}

    if (skip && skip !== queryDefaults.skip) queriesArray.push(`skip=${skip}`)
    if (limit && limit !== queryDefaults.limit)
      queriesArray.push(`limit=${limit}`)
    if (sort && skip !== queryDefaults.sort) queriesArray.push(`sort=${sort}`)

    if (queriesArray[0]) fetchingUrl += '?' + queriesArray.join('&')

    console.log('Fetching post from: ', fetchingUrl)
    fetch(fetchingUrl)
      .then(res => res.json())
      .then(json => {
        if (json.ok) return resolve(json.posts)
        reject(json.msg)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}
