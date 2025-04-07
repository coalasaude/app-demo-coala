import React from 'react'

import BaseMessageInfoUnit from './BaseMessageInfoUnit'

import HealthForm from '/public/assets/svg/UnitPanel/HealthForm.svg'

export const MessageTypeTwo = () => {
  return (
    <BaseMessageInfoUnit
      icon={<HealthForm />}
      text='Preencher a ficha ajuda muito nos'
      subText='atendimentos, incentive o preenchimento!'
      title='Ficha de saúde'
    />
  )
}

export default MessageTypeTwo
