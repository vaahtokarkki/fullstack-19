import React from 'react'

import Weather from './Weather'

const Country = ({ data }) => {
    return (
        <div>
            <h1>{data.name}</h1>

            capital {data.capital}<br />
            population {data.population}
            
            <h3>languages</h3>
            <ul>
                {data.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>

            <img src={data.flag} width={200}/>

            <Weather city={data.capital} />
        </div>
    )
}

export default Country