const Numbers = ({persons, filter}) => {
    return(
        persons.filter(
            (person) => person.name.toLowerCase().includes(filter)
        ).map(
            (person) => <div key={person.id}>{person.name} {person.number}</div>
        )
    )
}

export default Numbers