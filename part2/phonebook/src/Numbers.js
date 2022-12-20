const DeleteButton = ({person, deleteEntry}) => {
    const confirmAndDelete = (person) => () => {
        if (window.confirm(`Delete ${person.name}?`)){
            deleteEntry(person.id)
        }
    }
    return(
        <button onClick={confirmAndDelete(person)}>delete</button>
    )
}


const Numbers = ({persons, filter, deleteEntry}) => {
    return(
        persons.filter(
            person => person.name.toLowerCase().includes(filter)
        ).map(
            person =>
                <div key={person.id}>
                    {person.name} {person.number}{" "}
                    <DeleteButton person={person} deleteEntry={deleteEntry}/>
                </div>
        )
    )
}

export default Numbers