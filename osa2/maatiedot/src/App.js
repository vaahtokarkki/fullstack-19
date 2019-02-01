import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CountryList from './components/CountryList'
import Filter from './components/Filter';

const App = () => {
  const [filter, setFilter] = useState('')
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountryData(res.data)
      })
  }, [])

  const onFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const onSetFilter = (filter) => {
    setFilter(filter)
  }

  const rows = countryData.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Filter filter={filter} onFilterChange={onFilterChange} />
      <CountryList data={rows} setFilter={onSetFilter} />
    </div>
  )
}


export default App;
