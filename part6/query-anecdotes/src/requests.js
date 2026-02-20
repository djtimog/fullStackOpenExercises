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
