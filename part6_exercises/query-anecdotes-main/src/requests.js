import axios from 'axios'
const baseUrl ="http://localhost:3001/anecdotes"

export const getAnecdotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const createAnec = newAnec => {
    return axios.post(baseUrl,newAnec).then(res=>res.data)
}

export const updateVote = async(Anec) => {
    const res = await axios.put(`${baseUrl}/${Anec.id}`, Anec)
    return res.data
}