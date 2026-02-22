import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdotes } from '../requests'
import { useContext } from 'react'
import { NotificationContext } from '../context/notification'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      notificationDispatch({
        type: 'SET',
        payload: `Anecdote '${newAnecdote.content}' created`,
      })
      setTimeout(
        () =>
          notificationDispatch({
            type: 'REMOVE',
          }),
        2000,
      )
      queryClient.setQueryData(['anecdotes'], (oldData) => {
        return [...oldData, newAnecdote]
      })
    },
    onError: (error) => {
      notificationDispatch({
        type: 'SET',
        payload: `too short anecdote, must have length 5 or more`,
      })
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 2000)
    },
  })

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
