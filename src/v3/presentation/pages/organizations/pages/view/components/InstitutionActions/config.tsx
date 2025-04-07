import { Typography } from '@mui/material'
import { ReactNode } from 'react'

import { AppointmentReqData } from '@/types/analytics'

export const CardTitle = ({ children }: { children: ReactNode }) => (
  <Typography
    variant='h6'
    whiteSpace='nowrap'
    sx={{
      margin: 0,
    }}
  >
    {children}
  </Typography>
)

export const insitutionActionsConfig: Partial<
  Record<
    keyof AppointmentReqData,
    {
      title: ReactNode
      isPrimary?: boolean
    }
  >
> = {
  requestedAppointments: {
    title: (
      <>
        <CardTitle>Solicitados</CardTitle>
      </>
    ),
    isPrimary: true,
  },
  closedAppointments: {
    title: (
      <>
        <CardTitle>Finalizados</CardTitle>
      </>
    ),
  },
  appointmentsInProgress: {
    title: (
      <>
        <CardTitle>Em andamento</CardTitle>
      </>
    ),
  },
  resubility: {
    title: (
      <>
        <CardTitle>Resolubilidade</CardTitle>
      </>
    ),
  },
}
