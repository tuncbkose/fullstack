import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

import Notification from "./Notification";

const Anecdote = ({ anecdote, handleVote }) => {

    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes}) => {
        if ( filter === '' ) {
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    const compareByVotes = (a, b) => {
        return b.votes - a.votes
    }

    return (
        <>
            <h2>Anecdotes</h2>
            <Notification/>
            {/* I had to get a copy of the array before sorting for some reason */}
            {anecdotes.slice().sort(compareByVotes)
                .map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={() => vote(anecdote)}/>
            )}
        </>
    )
}

export default AnecdoteList