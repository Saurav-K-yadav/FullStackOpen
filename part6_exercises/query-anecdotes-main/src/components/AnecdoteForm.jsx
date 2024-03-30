import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnec } from '../requests'
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch=useNotificationDispatch()

  const newAnecMutation = useMutation({
    mutationFn: createAnec,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['anecdotes']})
    },
    onError: () => {
      dispatch({
        type: "SHOW",
        payload: `minimum length of context should be 5`
      })
      setTimeout(() => {
        dispatch({ type: "DONTSHOW" });
      }, 5000);
    }
  });


  const onCreate = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecMutation.mutate({
      content,votes:0
    })
    await dispatch({
      type: "SHOW",
      payload:`added : ${content}`
    })
    setTimeout(() => {
      dispatch({type:"DONTSHOW"})
    }, 5000);
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
