import axios from "axios";
const url = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(url).then(
        response=>response.data
    );
}

const create = (newObject) => {
    const request = axios.post(url, newObject)
    return request.then(response => response.data)
}

const del = (id) => {
    return axios.delete(`${url}/${id}`).then(() => {
        console.log('deleted');
    }) 
};
const update = (id, val) => { 
     let value=axios.put(`${url}/${id}`, val)
        return value.then(response => response.data)
}

export default { update,getAll,create,del}