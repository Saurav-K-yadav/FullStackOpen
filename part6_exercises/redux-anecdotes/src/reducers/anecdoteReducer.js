import { createSlice } from '@reduxjs/toolkit'
import anecService from '../services/anecdote'

const anecdotesAtStart = [
  'If it hurts, do it more often',
]


const anecdoteSlice = createSlice({
  name: anecdotesAtStart,
  initialState:[],
  reducers: {
    appendVoted(state, action) {
      const id = action.payload.id
      const newState = state.filter(n => n.id !== id)
      newState.push(action.payload)
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    },

    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdotes(state, action) {
       state.push(action.payload)
    }
  }
})

export const {appendAnecdotes,appendVoted ,setAnecdotes } = anecdoteSlice.actions

export const createAnec = (anecdote) => {
  return async dispatch => {
    const newAnec=await anecService.createAnecdote(anecdote)
    dispatch(appendAnecdotes(newAnec))
  }
}

export const initialAnecdotes =  () => {
  return async dispatch => {
    const anec = await anecService.getAll()
    dispatch(setAnecdotes(anec))
  }
}


export const addVote=(content)=> {
  return async dispatch => {
    const newContent = await anecService.voteContent(content)
    dispatch(appendVoted(newContent))
  }
}

export default anecdoteSlice.reducer
