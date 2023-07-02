import { useDispatch } from 'react-redux'

import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from '../services/anecdotes'
import { removeNotification, setNotification } from "../reducers/notificationReducer";


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(createAnecdote(newAnecdote))
      dispatch(setNotification(`you created '${content}'`))
      setTimeout(() => dispatch(removeNotification()), 5000)
  }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm