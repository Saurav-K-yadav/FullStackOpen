import {  useMutation, useQuery,useQueryClient } from '@tanstack/react-query'
import { getAnecdotes,updateVote } from './requests'
import { useNotificationDispatch } from './notificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient();
const dispatch=useNotificationDispatch()

  const updateVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:['anecdotes']
      })
    }
  })
  
  const handleVote = async(anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    await dispatch({
      type: "SHOW",
      payload:`Voted ${anecdote.content}`
    })
    setTimeout(() => {
      dispatch({type: "DONTSHOW"})
    }, 5000)
    console.log('CALLED VOTED')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry:1
  });

    if (result.isLoading) {
      return <div>loading data...</div>;
    }
  
  if (result.isError) {
      return <div>anecdote service not available due to problems in server</div>;
    }
  
    const anecdotes = result.data;

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
