import Country from "./Country"

const Countries = ({countries, filter}) => {
    const filtered = countries.filter(
        (country) => country.name.common.toLowerCase().includes(filter)
    )
    if (filtered.length > 10){
        return (
            <>Too many matches, specify another filter</>
    )
    } else if (filtered.length === 1){
        return(  <Country country={filtered[0]}/> )
    } else {
        return (
            filtered.map(
                (country) => <div key={country.ccn3}>{country.name.common}</div>
            )
        )
    }
}

export default Countries