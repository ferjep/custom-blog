import React, { useState } from 'react'
import './CommentForm.scss'

export default function CommentForm({ onSubmit }) {
  const [msg, setMsg] = useState({})
  const [comment, setComment] = useState({ author: '', text: '' })

  const handleChange = e => {
    const { value, name } = e.target
    setComment(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onSubmit(comment)
      .then(msg => setMsg({ type: 'sucess', value: msg }))
      .catch(msg => setMsg({ type: 'error', value: msg }))
  }

  return (
    <div className="CommentForm">
      <label className="CommentForm-label">
        <input
          type="text"
          name="author"
          placeholder="Your name"
          value={comment.author}
          onChange={handleChange}
          className="CommentForm-author"
        />
      </label>
      <textarea
        name="text"
        className="CommentForm-text"
        placeholder="Add a comment"
        value={comment.text}
        onChange={handleChange}
      ></textarea>
      <div className="CommentForm-bottom">
        <span
          className={
            msg.type === 'sucess'
              ? 'CommentForm-msg success'
              : 'CommentForm-msg error'
          }
        >
          {msg.value}
        </span>
        <button className="btn CommentForm-btn" onClick={handleSubmit}>
          Comment
        </button>
      </div>
    </div>
  )
}
