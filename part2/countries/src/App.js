import { useState, useEffect } from 'react'
import axios from "axios"
import Filter from "./Filter"
import Countries from "./Countries";

function App() {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountries(response.data)
                console.log(response.data)
            })
    }, [])

      const updateFilter = (event) => {
          setFilter(event.target.value)
        }

      return (
        <div>
            <Filter updateFilter={updateFilter}/>
            <Countries countries={countries} filter={filter}/>
        </div>
      );
}

export default App;
