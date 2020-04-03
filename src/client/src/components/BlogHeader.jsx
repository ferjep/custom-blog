import React from 'react'
import './BlogHeader.scss'

export default function BlogHeader({ blogName, author, prof }) {
  return (
    <div className="blog-header-bg">
      <div className="blog-header page-center">
        <div className="blog-header-left">
          <div className="blog-header-title">
            <h1>{blogName}</h1>
          </div>
        </div>
        <div className="blog-header-right">
          <div className="blog-header-author">
            <h2>{author}</h2>
          </div>
          <div className="blog-header-prof">
            <h2>{prof}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
