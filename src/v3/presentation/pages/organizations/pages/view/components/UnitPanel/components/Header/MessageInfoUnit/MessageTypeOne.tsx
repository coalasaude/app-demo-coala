import React from 'react'

import BaseMessageInfoUnit from './BaseMessageInfoUnit'

import ActivateAccounts from '/public/assets/svg/UnitPanel/ActivateAccounts.svg'

export const MessageTypeOne = () => {
  return (
    <BaseMessageInfoUnit
      icon={<ActivateAccounts />}
      textTitle='Olá!'
      text='Lembre seus colaboradores e'
      subText='responsáveis de ativar a conta!'
      title=' Ativar Contas'
    />
  )
}

export default MessageTypeOne
