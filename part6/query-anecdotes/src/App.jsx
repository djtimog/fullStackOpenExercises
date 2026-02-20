import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  if (result.isLoading) {
    return <div>Loading... </div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to server problems</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

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

export default App
