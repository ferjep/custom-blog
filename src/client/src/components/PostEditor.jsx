import React, { useState, useEffect, useContext } from 'react'
import './PostEditor.scss'
import { Redirect, useParams } from 'react-router-dom'
import { MessageContext } from '../context/MessageContext'
import EditorJS from '@editorjs/editorjs'
import TagsInput from 'react-tagsinput'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import editorTools from './editor.tools'
import Loading from './Loading'
import Comments from './Comments'

const toSlug = string =>
  string
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -

export default function PostEditor({ edit }) {
  //if edit prop is passed, it will run in edit mode
  const params = useParams()
  const [tags, setTags] = useState([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [comments, setComments] = useState([])
  const [slugInputDisabled, setSlugInputDisabled] = useState(true)
  const [editorInstance, setEditorInstance] = useState({})
  const [editorConfig, setEditorConfig] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [redirect, setRedirect] = useState(false)
  const setMessage = useContext(MessageContext)

  useEffect(() => {
    // eslint-disable-next-line
    const holder = 'editor-js'

    if (edit) {
      fetch(`/api/posts/${params.slug}`)
        .then(res => res.json())
        .then(json => {
          if (json.ok) {
            const post = json.post
            console.log('Post fetched', post)
            setTitle(post.title)
            setTags(post.tags)
            setSlug(post.slug)
            setComments(post.comments || [])
            setEditorConfig({
              holder,
              slug: params.slug,
              data: { blocks: post.blocks },
              tools: editorTools,
            })
          } else {
            setMessage({
              type: 'error',
              text: json.msg,
            })
          }

          setIsLoading(false)
        })
        .catch(err => {
          setMessage({
            type: 'error',
            text: 'Could not request post',
          })
          setIsLoading(false)
          console.log(err)
        })

      console.log('edit mode')
    } else {
      setEditorConfig({
        holder,
        tools: editorTools,
      })
      setIsLoading(false)
      console.log('new mode')
    }
  }, [])

  useEffect(() => {
    if (Object.keys(editorConfig).length > 0 && !isLoading) {
      console.log('The config which EditorJS is created with', editorConfig)
      setEditorInstance(new EditorJS(editorConfig))
    }
  }, [editorConfig, isLoading])

  useEffect(() => {
    if (editorInstance.destroy) {
      return () => {
        editorInstance.destroy()
      }
    }
  }, [editorInstance])

  const savePost = async e => {
    const editorData = await editorInstance.save()

    if (!title) {
      return setMessage({ type: 'error', text: 'Add title' })
    }

    if (!slug) {
      return setMessage({ type: 'error', text: 'Add url' })
    }

    if (tags.length < 2) {
      return setMessage({ type: 'error', text: 'Add at least 2 tags' })
    }

    if (editorData.blocks.length === 0) {
      return setMessage({ type: 'error', text: 'the post body is empty' })
    }

    const post = {
      title,
      slug,
      tags,
      blocks: editorData.blocks,
      editorjs_v: editorData.version,
    }

    console.log('Post saved by btn', post)

    const fetchingData = {}

    if (edit) {
      fetchingData.url = `/api/posts/${editorConfig.slug}`
      fetchingData.method = 'put'
    } else {
      fetchingData.url = '/api/posts/new'
      fetchingData.method = 'post'
    }

    console.log('Where is being fetched', fetchingData)

    fetch(fetchingData.url, {
      method: fetchingData.method,
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log('Response Fetched after saving', json)
        if (json.ok) {
          setRedirect(true)
          setMessage({
            type: 'success',
            text: json.msg,
          })
        } else {
          setMessage({ type: 'error', text: json.msg })
        }
      })
      .catch(err => {
        console.error('Something went wrong while saving', err)
        setMessage({ type: 'error', text: 'Could not get to the server' })
      })
  }

  const deletePost = () => {
    fetch(`/api/posts/${editorConfig.slug}`, {
      method: 'delete',
    })
      .then(res => res.json())
      .then(json => {
        if (json.ok) {
          setRedirect(true)
          setMessage({ type: 'success', text: json.msg })
        } else {
          setMessage({ type: 'error', text: json.msg })
        }
      })
      .catch(err =>
        setMessage({ type: 'error', text: 'Could not get to the server' })
      )
  }

  const deleteComment = id => {
    fetch(`/api/posts/${editorConfig.slug}/comments/${id}`, {
      method: 'delete',
    })
      .then(res => res.json())
      .then(json => {
        console.log('Deleted comment response', json)
        if (json.ok) {
          setComments(json.comments)
          setMessage({ type: 'success', text: json.msg })
        } else {
          setMessage({ type: 'error', text: json.msg })
        }
      })
      .catch(err =>
        setMessage({ type: 'error', text: 'Could not get to the server' })
      )
  }

  if (redirect) return <Redirect to="/admin/posts" />

  if (isLoading) return <Loading />

  return (
    <div className="PostEditor">
      <div className="page-center">
        <div className="page-header">
          {edit ? (
            <>
              <h1>Edit Post</h1>
              <div className="btn-wrapper">
                <button className="btn danger" onClick={deletePost}>
                  Delete
                </button>
                <button className="btn success" onClick={savePost}>
                  Edit
                </button>
              </div>
            </>
          ) : (
            <>
              <h1>Create Post</h1>
              <div className="btn-wrapper">
                <button className="btn success" onClick={savePost}>
                  Create
                </button>
              </div>
            </>
          )}
        </div>

        <div className="post-info">
          <label className="input-wrapper">
            <span className="input-name">Title</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={e => {
                if (slugInputDisabled) setSlug(toSlug(e.target.value))
                setTitle(e.target.value)
              }}
              placeholder="Add title"
            />
          </label>
          <label className="input-wrapper">
            <span className="input-name">Tags</span>
            <TagsInput value={tags} onChange={tags => setTags(tags)} />
          </label>
          <label className="input-wrapper">
            <span className="input-name">Url</span>
            <input
              type="text"
              name="slug"
              value={slug}
              onChange={e => setSlug(toSlug(e.target.value))}
              placeholder="url"
              disabled={slugInputDisabled}
            />
            <button
              className="slug-input-btn"
              onClick={e => setSlugInputDisabled(prev => !prev)}
            >
              {slugInputDisabled ? <FaLock /> : <FaLockOpen />}
            </button>
          </label>
        </div>
        <div id="editor-js" className="border-gray"></div>

        {edit && (
          <div className="PostEditor-comments">
            <h1 className="PostEditor-comments-title">Comments</h1>
            <Comments admin comments={comments} onDelete={deleteComment} />
          </div>
        )}
      </div>
    </div>
  )
}
