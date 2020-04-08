import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'

export const BlogConfigConext = React.createContext()

export const BlogConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const update = (data) => {
    return new Promise((resolve, reject) => {
      fetch('/api/blog/config', {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.ok) {
            setConfig({ ...json.config })
            resolve('Config updated')
          } else {
            reject(json.msg)
          }
        })
        .catch((err) => reject('Could not get to the server'))
    })
  }

  useEffect(() => {
    fetch('/api/blog/config')
      .then((res) => res.json())
      .then((json) => setConfig(json.config))
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (Object.keys(config).length > 0 && config.constructor === Object) {
      console.log(config)
      setIsLoading(false)
    }
  }, [config])

  if (isLoading) return <Loading />

  return (
    <BlogConfigConext.Provider value={{ data: config, update }}>
      {children}
    </BlogConfigConext.Provider>
  )
}
