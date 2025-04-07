import React from 'react'

import MessageTypeOne from './MessageTypeOne'
import MessageTypeTwo from './MessageTypeTwo'
import MessageTypeThree from './MessageTypeThree'

type Props = {
  requestedAppointments: number
}

export const UnitPanelMessages = ({ requestedAppointments }: Props) => {
  return requestedAppointments > 15 ? (
    <MessageTypeThree />
  ) : requestedAppointments > 5 ? (
    <MessageTypeTwo />
  ) : (
    <MessageTypeOne />
  )
}

export default UnitPanelMessages
