import React, { useRef, useState } from 'react'

import IconaInvio from './IconaInvio'
import IconaPin from './IconaPin'

import classi from './FormCity.module.css'

function FormCity (props) {
  const [infoGeo, setInfoGeo] = useState({})
  const inputRef = useRef()
  let geoData = {}
  const sendFetchHandler = async event => {
    event.preventDefault()

    let datiFetch = {}
    const inputValue = inputRef.current.value

    if (inputValue.trim().length === 0) {
      datiFetch = {
        status: 'error',
        code: 'Non è stata trovata alcuna città con quel nome',
        messaggio: 'verifica il testo inserito e riprova'
      }
      return props.formHandler(datiFetch)
    }

    console.log('Richiesta dati geolocalizzazione per la città ' + inputValue)

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?count=1&language=it&format=json&name=${inputValue}`
      )

      const jsonData = await response.json()

      if (!response.ok || !jsonData.results) {
        throw new Error('', {
          cause: {
            code: response.status,
            codeText: jsonData.reason,
            cityExist: 'results' in jsonData
          }
        })
      }

      geoData = {
        lat: jsonData.results[0].latitude.toFixed(2),
        lon: jsonData.results[0].longitude.toFixed(2),
        cityName: `
          ${jsonData.results[0].name}, ${jsonData.results[0].admin1}, ${jsonData.results[0].country_code}`
      }

      datiFetch = { ...geoData }

      console.table(geoData)
    } catch (error) {
      geoData = { lat: '???', lon: '???', cityName: '???' }

      if (error.cause && error.cause.code !== 200) {
        datiFetch = {
          status: 'error',
          code: 'Codice errore: ' + error.cause.code,
          messaggio:
            'Errore imprevisto nella richiesta info geo: ' +
            error.cause.codeText
        }
      } else if (error.cause && error.cause.cityExist === false) {
        datiFetch = {
          status: 'error',
          code: 'Non è stata trovata alcuna città con quel nome',
          messaggio: 'verifica il testo inserito e riprova'
        }
      } else {
        datiFetch = {
          status: 'error',
          code: 'Qualcosa è andato storto, verifica la tua connessione e riprova',
          messaggio: error.message
        }
      }
    }
    setInfoGeo(geoData)
    props.formHandler(datiFetch)
  }

  return (
    <header>
      <div className={classi.iconaPin}>
        <IconaPin />
      </div>
      <div className={classi['form-container']}>
        <form onSubmit={sendFetchHandler}>
          <input placeholder='Città...' type='text' ref={inputRef}></input>
          <button className={classi.iconaInvio}>
            <IconaInvio />
          </button>
        </form>
        <section className={classi.infoGeotag}>
          <span>Lat: {infoGeo.lat}</span>
          <span>Lon: {infoGeo.lon}</span>
          <span>Città: {infoGeo.cityName}</span>
        </section>
      </div>
    </header>
  )
}

export default FormCity
