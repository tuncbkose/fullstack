import { useState } from 'react'
import Numbers from "./Numbers.js"


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")


    const addEntry = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name === newName)){
            alert(`${newName} is already added to phonebook`)
        } else {
            const person = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }
            setPersons(persons.concat(person))
            setNewName("")
            setNewNumber("")
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const updateFilter = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                filter shown with <input onChange={updateFilter}/>
            </form>
            <h2>add a new</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit" onClick={addEntry}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <Numbers persons={persons} filter={filter}/>
        </div>
  )
}

export default App