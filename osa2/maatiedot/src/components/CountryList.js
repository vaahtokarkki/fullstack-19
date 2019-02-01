import React from 'react'

import Country from './Country'

const CountryList = ({ data, setFilter }) => {

    if (data.length === 1) {
        return (<Country data={data[0]} />)
    }

    if (data.length > 5) {
        return (<div>Too many matches, speficy another filter</div>)
    }

    return (
        data.map(row =>
            <div key={row.name}>
                {row.name}
                <button onClick={() => setFilter(row.name)}>näytä</button>
            </div>
        )
    )

}

export default CountryList