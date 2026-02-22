import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { updateAnecdotes } from '../requests'
import { NotificationContext } from '../context/notification'

export default function AnecdoteList({ result }) {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const votingMutation = useMutation({
    mutationFn: updateAnecdotes,
    onSuccess: (updatedAnecdote) => {
      notificationDispatch({
        type: 'SET',
        payload: `Anecdote '${updatedAnecdote.content}' voted`,
      })
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 2000)
      queryClient.setQueryData(['anecdotes'], (oldData) => {
        return oldData.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote,
        )
      })
    },
  })

  const handleVote = (anecdote) => {
    votingMutation.mutate(anecdote)
  }
  return (
    <div>
      {result.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
