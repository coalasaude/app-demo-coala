import React from 'react'

import BaseMessageInfoUnit from './BaseMessageInfoUnit'

import UnitHealth from '/public/assets/svg/UnitPanel/UnitHealth.svg'

export const MessageTypeThree = () => {
  return (
    <BaseMessageInfoUnit
      icon={<UnitHealth />}
      text='Você tem muitos atendimentos resolvidos por teleatendimento 💜'
      textTitle='Parabéns!'
      title='Saúde escolar'
    />
  )
}

export default MessageTypeThree
