import axios from 'axios'
const baseUrl = "/api/users";


const getAllUsers = async() => {
    const values = await axios.get(baseUrl)  
    return values.data
}

export default {getAllUsers}