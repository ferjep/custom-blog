import React, { useState, useEffect, useRef } from 'react'
import './PostCard.scss'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function PostCard({ post, admin, mobile }) {
  const [date] = useState(new Date(post.createdAt))
  const postCard = useRef(null)

  useEffect(() => {})

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return (
    <div
      className={
        mobile
          ? 'PostCard border-gray PostCard--mobile'
          : 'PostCard border-gray'
      }
      ref={postCard}
    >
      <div
        className="PostCard-image"
        style={{ backgroundImage: `url(${post.mainImage})` }}
      ></div>
      <div className="PostCard-title">
        <Link
          to={admin ? `/admin/posts/edit/${post.slug}` : `/posts/${post.slug}`}
        >
          <h2>{post.title}</h2>
        </Link>
      </div>

      <div className="PostCard-date">
        <FaRegCalendarAlt className="PostCard-date--icon" />
        <span>{`${
          monthNames[date.getMonth()]
        } ${date.getDay()}, ${date.getFullYear()}`}</span>
      </div>
      <div className="PostCard-resume">
        <p>{post.resume}</p>
      </div>
      <div className="PostCard-tags">
        {post.tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  )
}
