import React from 'react'

import classi from './IconaMeteo.module.css'

import iconaUndef from '../../assets/question-svgrepo-com.svg'
import iconaError from '../../assets/caution-sign-circle-svgrepo-com.svg'
import iconaSun from '../../assets/sun-svgrepo-com.svg'
import iconaSunCloudy from '../../assets/sun-cloudy-svgrepo-com.svg'
import iconaCloudy from '../../assets/cloudy-svgrepo-com.svg'
import iconaRain from '../../assets/rain-alt-svgrepo-com.svg'
import iconaThunder from '../../assets/cloud-strom-2-svgrepo-com.svg'
import iconaFog from '../../assets/fog.svg'
//import iconaWind from '../../assets/wind-svgrepo-com.svg'

function IconaMeteo (props) {
  let icona = iconaUndef

  switch (props.iconaCode) {
    default:
      icona = iconaUndef
      break
    case 'error':
      icona = iconaError
      break
    case '0':
      icona = iconaSun
      break
    case '1':
    case '2':
    case '3':
      icona = iconaSunCloudy
      break
    case '45':
    case '48':
      icona = iconaFog
      break
    case '51':
    case '53':
    case '55':
      icona = iconaCloudy
      break
    case '61':
    case '63':
    case '65':
    case '80':
    case '81':
    case '82':
      icona = iconaRain
      break
    case '95':
    case '96':
    case '99':
      icona = iconaThunder
      break
  }

  return (
    <div className={classi.iconaMeteo}>
      <img src={icona} alt='icona meteo' />
    </div>
  )
}

export default IconaMeteo
