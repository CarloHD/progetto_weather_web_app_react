import React, { useState } from 'react'
import FormCity from './components/cityInput/FormCity'

import './App.css'
import MainMeteo from './components/meteo/MainMeteo'

function App () {


  const [datiGeo, setDatiGeo] = useState({})

  const formHandler = datiFetch => {
    setDatiGeo(datiFetch)
  }

  return (
    <div className='app'>
      <FormCity formHandler={formHandler} />
      <MainMeteo datiGeo={datiGeo} />
    </div>
  )
}

export default App
