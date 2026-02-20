const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => Math.floor(Math.random() * 10000)
export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdote')
  }

  return await response.json()
}

export const createAnecdotes = async (content) => {
  const options = {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      id: getId(),
      votes: 0,
    }),
  }

  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }

  return await response.json()
}

export const updateAnecdotes = async (anecdote) => {
  const newAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  }
  console.log(newAnecdote)

  const options = {
    method: 'PUT',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAnecdote),
  }

  const response = await fetch(`${baseUrl}/${anecdote.id}`, options)
  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  return await response.json()
}
