import React from 'react'

import Requested from '/public/assets/svg/UnitPanel/Requested.svg'

import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants'

import { BaseUnitPanel } from '../BaseUnitPanel/BaseUnitPanel'
import BaseText from '../BaseUnitPanel/BaseText'

type Props = {
  requestedAppointments: number
}

export const RequestedAppointments = ({ requestedAppointments = 0 }: Props) => {
  return (
    <BaseUnitPanel id={target.coalaAppointmentResolved}>
      <Requested style={{ minWidth: 25 }} />
      <BaseText
        title='Atendimento solicitados'
        number={requestedAppointments}
        descriptionTooltip='Atendimentos com desfecho "Inválido" ou "Evasão" não são contabilizados.'
      />
    </BaseUnitPanel>
  )
}

export default RequestedAppointments
