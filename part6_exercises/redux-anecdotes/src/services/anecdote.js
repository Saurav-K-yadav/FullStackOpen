import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (anec) => {
    const object = { content:anec, votes: 0 }
    const response = await axios.post(baseUrl, object)
    console.log(`OBJECT ${response}`);
    
    return response.data
}

const voteContent = async (anec) => {
    const newData = {
        content:anec.content,
        votes:anec.votes+1
    }
    const newContent = await axios.put(`${baseUrl}/${anec.id}`, newData)
    // console.log(newContent);
    
    return newContent.data    
}

export default{voteContent,getAll,createAnecdote}