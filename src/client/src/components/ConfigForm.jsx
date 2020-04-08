import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { BlogConfigConext } from '../context/BlogConfigContext'
import { MessageContext } from '../context/MessageContext'
import Loading from './Loading'

export default function BlogConfigForm() {
  const BlogConfig = useContext(BlogConfigConext)
  const setMessage = useContext(MessageContext)
  const [redirect, setRedirect] = useState(false)
  const [currentConfig, setCurrentConfig] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCurrentConfig({ ...BlogConfig.data })
  }, [BlogConfig])

  useEffect(() => {
    if (Object.keys(currentConfig).length > 0) setIsLoading(false)
  }, [currentConfig])

  const handleChange = (e) => {
    let { name, value } = e.target

    if (name === 'name' && value.length > 40) value = value.substring(0, 40)
    setCurrentConfig((prev) => ({ ...prev, [name]: value }))
  }

  const saveConfig = () => {
    BlogConfig.update({ ...currentConfig })
      .then((msg) => {
        setRedirect(true)
        setMessage({ type: 'success', text: msg })
      })
      .catch((err) => setMessage({ type: 'error', text: err }))
  }

  if (redirect) return <Redirect to="/admin/posts" />
  if (isLoading) return <Loading />

  return (
    <div className="page-center">
      <div className="page-header">
        <h1>Blog config</h1>
        <button className="btn" onClick={saveConfig}>
          Save
        </button>
      </div>
      <br />
      <label className="input-wrapper">
        <span className="input-name">Blog Name</span>
        <input
          type="text"
          name="name"
          value={currentConfig.name}
          onChange={handleChange}
          placeholder="Max: 40 characters"
        />
      </label>
      <label className="input-wrapper">
        <span className="input-name">Twitter Handle</span>
        <input
          type="text"
          name="twitter"
          value={currentConfig.twitter}
          onChange={handleChange}
          placeholder="without @"
        />
      </label>
      <label className="input-wrapper">
        <span className="input-name">Author</span>
        <input
          type="text"
          name="author"
          value={currentConfig.author}
          onChange={handleChange}
        />
      </label>
      <label className="input-wrapper">
        <span className="input-name">Author profession</span>
        <input
          type="text"
          name="author_profession"
          value={currentConfig.author_profession}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}
