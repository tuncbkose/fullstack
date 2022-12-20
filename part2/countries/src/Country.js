import Weather from "./Weather"

const Country = ({country}) => {
    const languages = Object.values(country.languages)

    return(
        <>
            <h2>{country.name.common}</h2>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>

            <h3>languages:</h3>
            <ul>
                {languages.map(
                    (lang, idx) => <li key={idx}>{lang}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
            <Weather country={country}/>
        </>
    )
}

export default Country