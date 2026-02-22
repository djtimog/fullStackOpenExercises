import { useReducer } from 'react'
import { NotificationContext } from '../context/notification'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return ''
    default:
      state
  }
}

export function NotificationProvider({ children }) {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    '',
  )
  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
