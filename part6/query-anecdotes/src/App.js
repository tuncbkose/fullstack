import { useQuery, useMutation, useQueryClient } from "react-query"
import { useNotificationDispatch } from "./NotificationContext";
import { getAnecdotes, updateAnecdote } from "./requests";

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
      onSuccess: (updatedAnecdote) => {
          const anecdotes = queryClient.getQueryData('anecdotes')
          const updatedAnecdotes = anecdotes.map(
              anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
          )
          queryClient.setQueryData('anecdotes', updatedAnecdotes)
          notificationDispatch({ type: "SET", payload: `anecdote '${updatedAnecdote.content}' voted` })
          setTimeout(() => {notificationDispatch({ type: "CLEAR" })}, 5000)
      }
  })
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery(
      'anecdotes',
      getAnecdotes,
      {
          refetchOnWindowFocus: false,
          retry: 1
      }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if ( result.isError ) {
      return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
