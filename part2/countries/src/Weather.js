import axios from "axios"
import { useState, useEffect } from 'react'

const Weather = ({country}) => {
    const [weather, setWeather] = useState({dummy:true})

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
    }, [country.capital])

    // For proper behavior when we haven't fetched weather data yet
    if (weather.dummy){return (
        <></>
    )}
    return(
        <div>
            <h3>{`Weather in ${country.capital[0]}`}</h3>
            <div>temperature {weather.main.temp} Celsius</div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                 alt={`weather icon ${weather.weather[0].description}`}/>
            <div>wind {weather.wind.speed} m/s</div>
        </div>
    )
}

export default Weather