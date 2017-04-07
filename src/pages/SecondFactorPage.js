
import React from 'react'

import { Centerer } from '../components/Centerer.js'
import { SecondFactorPicker } from '../components/SecondFactorPicker.js'

//import AuthPlz from '../AuthPlz.js'

class SecondFactorPage extends React.Component {
  render() {
    return (
      <Centerer>
        <SecondFactorPicker u2f={true} totp={true} backup={true}/>
      </Centerer>
    ) 
  }
}

export {SecondFactorPage}
