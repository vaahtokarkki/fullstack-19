import React from 'react'

const FilterPersons = ({filter, onFilterChange}) => {
    return (
        <div>
            <h3>Suodata henkilöitä</h3>
            <input value={filter} onChange={onFilterChange} />
        </div>
    )
}

export default FilterPersons