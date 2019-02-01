import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {

    const [weatherData, setWeatherData] = useState('')

    useEffect(() => {  
        axios
            .get(`https://api.apixu.com/v1/current.json?key=b0f964c423d749bdbbd153159190102&q=${city}`)
            .then(res => {
                setWeatherData(res.data)
            })
    },[])

    if(weatherData === '') {
        return null
    }

    return (
        <div>
            <h3>Current weather in {city}</h3>
            <b>Temperature:</b> {weatherData.current.temp_c}C<br />
            <img 
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.text} />
            <br />
            <b>wind: </b>{weatherData.current.wind_kph} in direction {weatherData.current.wind_dir}
        </div>
    )

    //https://api.apixu.com/v1/current.json?key=b0f964c423d749bdbbd153159190102&q=Paris


}

export default Weather