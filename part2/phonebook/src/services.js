import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteEntry = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => {})
}

const update = newObject => {
    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return request.then(response => response.data)
}


const phonebookService = { getAll, create, deleteEntry, update }
export default phonebookService