import React, { useEffect, useCallback, useState } from 'react'
import InfoMeteo from './InfoMeteo'
import IconaMeteo from './IconaMeteo'

import classi from './MainMeteo.module.css'

function MainMeteo (props) {
  const datiGeo = props.datiGeo //{ lat: "36.92", lon: "14.72", cityName: "Ragusa" } o {status: 'error', code: Codice errore, messaggio : codeText}

  const [isLoading, setIsLoading] = useState(false)
  const [datiMeteo, setDatiMeteo] = useState({})

  const getDatiMeteo = useCallback(async () => {
    try {
      const fetchMeteo = await fetch(
        `https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,weathercode&forecast_days=1&timezone=auto&latitude=${datiGeo.lat}&longitude=${datiGeo.lon}`
      )

      if (!fetchMeteo.ok) {
        throw new Error('Qualcosa è andato storto...', {
          cause: [fetchMeteo.status, fetchMeteo.statusText]
        })
      }

      const infoMeteo = await fetchMeteo.json()
      const infoMeteoHourly = infoMeteo.hourly // {"time": ["2023-04-05T00:00",],"temperature_2m": [7.2,],"weathercode": [45,]}
      const oraAttuale = new Date().getHours()

      const meteo = {
        iconaCode: infoMeteoHourly.weathercode[oraAttuale].toString(),
        dataGiorno: new Date(infoMeteoHourly.time[oraAttuale])
          .toLocaleString()
          .slice(0, -3)
          .replace(',', ' ore'),
        temperatura: infoMeteoHourly.temperature_2m[oraAttuale],
        cityName: datiGeo.cityName
      }

      console.table(meteo)

      setDatiMeteo(meteo)
    } catch (error) {
      setDatiMeteo({
        iconaCode: 'error',
        code: 'Codice errore: ' + error.cause[0],
        messaggio: 'Errore imprevisto richiesta meteo: ' + error.cause[1]
      })
    }
  }, [datiGeo.cityName, datiGeo.lat, datiGeo.lon])

  useEffect(() => {
    if (Object.keys(datiGeo).length !== 0) {
      setIsLoading(true)
    }

    const getDatiMeteoTimer = setTimeout(() => {
      if ('cityName' in datiGeo) {
        getDatiMeteo()
      } else if ('status' in datiGeo) {
        setDatiMeteo(datiGeo)
      }
      setIsLoading(false)
    }, 500)

    return () => {
      clearTimeout(getDatiMeteoTimer)
    }
  }, [datiGeo, getDatiMeteo])

  return (
    <main className={classi.mainMeteo}>
      <section className={classi.contenitoreIcona}>
        {isLoading && <span className={classi.iconaLoading}></span>}
        {!isLoading && (
          <IconaMeteo iconaCode={datiMeteo.iconaCode || datiMeteo.status} />
        )}
      </section>
      <InfoMeteo datiMeteo={datiMeteo} />
    </main>
  )
}

export default MainMeteo
