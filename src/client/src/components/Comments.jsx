import React, { useState, useContext, useEffect } from 'react'
import './Comments.scss'
import { FaRegCalendarAlt } from 'react-icons/fa'

export default function Comments({ comments, onDelete, admin }) {
  const [isLoading, setIsLoading] = useState(true)

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
    'December',
  ]

  /*The way the comments' date is formated and re-render, 
    I think should be re-coded, but it works by now  */

  useEffect(() => {
    setIsLoading(true)
  }, [comments])

  useEffect(() => {
    if (Array.isArray(comments) && isLoading) {
      comments = formatDate(comments)
    }

    setIsLoading(false)
  }, [isLoading])

  const formatDate = comments => {
    const formatComments = comments.map(comment => {
      const date = new Date(comment.createdAt)

      comment.createdAt = `${
        monthNames[date.getMonth()]
      } ${date.getDay()}, ${date.getFullYear()}`

      return comment
    })

    console.log(formatComments)
    return formatComments
  }

  if (isLoading) return <></>

  return (
    <div className="Comments">
      {Array.isArray(comments) && comments[0] ? (
        comments.map(comment => (
          <div className="comment" key={comment._id}>
            <div className="comment-header">
              <h3 className="comment-header">{comment.author}</h3>
              {admin && (
                <button
                  className="btn danger"
                  onClick={() => onDelete(comment._id)}
                >
                  Delete
                </button>
              )}
            </div>
            <p className="comment-text">{comment.text}</p>
            <div className="comment-date">
              <FaRegCalendarAlt className="comment-date-icon" />
              <span className="comment-date-text">{comment.createdAt}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="Comments-no">
          <h3>No comments yet</h3>
        </div>
      )}
    </div>
  )
}
