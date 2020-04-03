import React, { useState, useContext } from 'react'
import './Blog.scss'
import { Switch, Route } from 'react-router-dom'
import { Navbar, NavLink } from './components/Navbar'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { BlogConfigConext } from './context/BlogConfigContext'
import BlogHeader from './components/BlogHeader'
import Posts from './components/Posts'
import SinglePost from './components/SinglePost'

export default function Blog(props) {
  const { data } = useContext(BlogConfigConext)
  const [panel, setPanel] = useState(false)

  return (
    <div>
      <Navbar logo="Blog" logoTo="/">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </Navbar>
      <BlogHeader
        blogName={data.name}
        author={data.author}
        prof={data.author_profession}
      />
      <div className="Blog-grid page-center">
        <div className="Blog-body">
          <Switch>
            <Route exact path="/">
              <Posts />
            </Route>
            <Route exact path="/posts/:slug">
              <SinglePost />
            </Route>
          </Switch>
        </div>

        <div className={panel ? 'Blog-panel show' : 'Blog-panel'}>
          <div
            className="Blog-panel-btn"
            onClick={() => setPanel(prev => !prev)}
          >
            Panel
          </div>
          <div className="Blog-panel-content">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName={data.twitter}
              options={{ height: '100vh' }}
            />
          </div>

          <div
            className="Blog-panel--closer"
            onClick={() => setPanel(prev => !prev)}
          ></div>
        </div>
      </div>
    </div>
  )
}
