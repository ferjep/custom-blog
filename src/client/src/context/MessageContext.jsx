import React, { useState } from 'react'
import './MessageContext.scss'

export const MessageContext = React.createContext()

export function MessageProvider({ children }) {
  const [message, setMessage] = useState({})

  return (
    <MessageContext.Provider value={setMessage}>
      {children}
      {message.type && message.text ? (
        <div
          className={
            message.type === 'error'
              ? 'message-alert error'
              : 'message-alert success'
          }
        >
          <span className="message-alert--text">{message.text}</span>
          <button
            className="message-alert--close"
            onClick={() => setMessage({})}
          >
            x
          </button>
        </div>
      ) : null}
    </MessageContext.Provider>
  )
}
