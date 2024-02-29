import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const update = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config)
  return request.data
}

const remove = async (newBlog) => {
  const config = {
    headers:{Authorization:token},
  }
  try {
    console.log(`${baseUrl}/${newBlog.id}`,  config)
  const request = await axios.delete(`${baseUrl}/${newBlog.id}`, config)
  console.log('called the delete axios');
  
    return request.data
  }
  catch (error) {
    console.log('ERROR CANT DELETE');
    
  }
}

export default {
  getAll,
  setToken,
  create,
  update,
  remove
}