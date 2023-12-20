import React from 'react'

import classi from './InfoMeteo.module.css'

function InfoMeteo (props) {
  const datiMeteo = props.datiMeteo // {iconaCode: 2, dataGiorno: 5/4/2023 ore 17:00, temperatura: 10.2, cityName: Ragusa, Sicilia, IT}
  let testoMeteo = ''
  switch (datiMeteo.iconaCode) {
    default:
      testoMeteo = ''
      break
    case '0':
      testoMeteo = 'Soleggiato'
      break
    case '1':
    case '2':
    case '3':
      testoMeteo = 'Parzialmente nuvoloso'
      break
    case '45':
    case '48':
      testoMeteo = 'Nebbia'
      break
    case '51':
    case '53':
    case '55':
      testoMeteo = 'Nuvoloso'
      break
    case '61':
    case '63':
    case '65':
    case '80':
    case '81':
    case '82':
      testoMeteo = 'Pioggia'
      break
    case '95':
    case '96':
    case '99':
      testoMeteo = 'Temporale'
      break
  }

  let content = <h2>Inserisci il nome di una città</h2>

  if ('status' in datiMeteo) {
    content = (
      <>
        <h2>{datiMeteo.code}</h2>
        <p>{datiMeteo.messaggio}</p>
      </>
    )
  } else if ('cityName' in datiMeteo) {
    content = (
      <>
        <h2>{datiMeteo.cityName}</h2>
        <span>{testoMeteo}</span>
        <span>Temperatura: {datiMeteo.temperatura + '°C'} </span>
      </>
    )
  }

  return (
    <section className={classi.infoMeteo}>
      <div className={classi.infoAggiornamento}>
        <span>{datiMeteo.dataGiorno}</span>
      </div>
      <div className={classi.dettagliMeteo}>{content}</div>
    </section>
  )
}

export default InfoMeteo
