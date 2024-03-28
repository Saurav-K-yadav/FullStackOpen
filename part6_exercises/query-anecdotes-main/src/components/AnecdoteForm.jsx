import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnec } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  
  const newAnecMutation = useMutation({
    mutationFn: createAnec,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['anecdotes']})
    }
  });


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecMutation.mutate({
      content,votes:0
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
