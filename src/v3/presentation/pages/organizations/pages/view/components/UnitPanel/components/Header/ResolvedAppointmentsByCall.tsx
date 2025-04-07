import React from 'react'

import Resolved from '/public/assets/svg/UnitPanel/Resolved.svg'

import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants'

import { BaseUnitPanel } from '../BaseUnitPanel/BaseUnitPanel'
import BaseText from '../BaseUnitPanel/BaseText'

type Props = {
  closedAppointments: number
}

export const ResolvedAppointmentsByCall = ({ closedAppointments = 0 }: Props) => {
  return (
    <BaseUnitPanel id={target.coalaAppointmentRequested}>
      <Resolved style={{ minWidth: 30 }} />
      <BaseText
        title='Resolvidos por teleatendimento'
        number={`${Math.round(closedAppointments * 100)}%`}
      />
    </BaseUnitPanel>
  )
}

export default ResolvedAppointmentsByCall
