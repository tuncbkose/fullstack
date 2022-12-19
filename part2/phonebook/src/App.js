import { useState } from 'react'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')


    const addName = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name === newName)){
            alert(`${newName} is already added to phonebook`)
        } else {
            const person = {
                name: newName
            }
            setPersons(persons.concat(person))
            setNewName("")
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    <button type="submit" onClick={addName}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <div key={person.name}>{person.name}</div>)}
        </div>
  )
}

export default App