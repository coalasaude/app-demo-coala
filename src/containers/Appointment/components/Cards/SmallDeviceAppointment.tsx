import { Box, Typography } from '@mui/material'
import React from 'react'

import Calendar from '/public/assets/svg/HealthHistoric/Calendar.svg'
import Alarm from '/public/assets/svg/AppointmentsView/Alarm.svg'
import Check from '/public/assets/svg/AppointmentsView/Check.svg'
import NotCheck from '/public/assets/svg/AppointmentsView/NotCheck.svg'
import Download from '/public/assets/svg/AppointmentsView/Download.svg'

import { GridItem, GridWrapper } from '@/components/Grid'
import { AuthorizationStatus } from '@/types/medicine'

import { SVGCard } from './styles'

import { SmallDeviceAppointmentCard } from '.'

type Props = {
  id: number
  professionalGenre?: string
  professionalFullName?: string
  subText?: string
  dateText?: string
  hourText?: string
  handleClick: any
  document_id?: number
  title: string
  index: number
  isTitle?: boolean
  authorizationStatus?: AuthorizationStatus
}

export const SmallDeviceAppointment = ({
  id,
  document_id,
  handleClick,
  title,
  index,
  subText,
  professionalGenre,
  professionalFullName,
  dateText,
  authorizationStatus,
  isTitle,
  hourText,
}: Props) => {
  return (
    <SmallDeviceAppointmentCard key={id} onClick={(e) => handleClick(e, document_id, id)}>
      <SmallDeviceAppointmentCard.Wrapper>
        <SmallDeviceAppointmentCard.Content>
          <Box>
            <Box display='flex' justifyContent='space-between' alignItems='right'>
              <SmallDeviceAppointmentCard.Title>
                {!isTitle ? `${title} 0${index + 1}` : title}
              </SmallDeviceAppointmentCard.Title>
              <Box>
                <Download />
              </Box>
            </Box>
            <GridWrapper spacing={1}>
              <GridItem xs={7} md={2}>
                <Box display='flex' alignItems='center'>
                  <Typography variant='h4' color='var(--mui-palette-grey-700)'>
                    {professionalGenre === 'Masculino' ? 'Dr.' : 'Dra.'}
                  </Typography>
                  <Typography variant='h4' color='var(--mui-palette-grey-700)'>
                    {`‎ ${professionalFullName}`}
                  </Typography>
                </Box>
              </GridItem>
              <GridItem xs={5} md={2}>
                <Box display='flex' alignItems='center' ml={1}>
                  <Calendar style={{ minWidth: '14px', minHeight: '14px' }} />
                  <Box ml={1} />
                  <Typography variant='h4' color='var(--mui-palette-grey-700)'>
                    {dateText}
                  </Typography>
                </Box>
              </GridItem>
              <GridItem xs={7} md={1}>
                <Box display='flex' alignItems='center'>
                  <Typography variant='h4' color='var(--mui-palette-grey-700)'>
                    {subText}
                  </Typography>
                  {!!authorizationStatus && subText ? (
                    <>
                      <SVGCard
                        isSelected={
                          authorizationStatus === AuthorizationStatus.AUTHORIZED ||
                          authorizationStatus === AuthorizationStatus.AUTHORIZED_SCHOOL
                        }
                      >
                        <Check />
                      </SVGCard>
                      <SVGCard isSelected={authorizationStatus === AuthorizationStatus.PENDING}>
                        <NotCheck />
                      </SVGCard>
                    </>
                  ) : null}
                </Box>
              </GridItem>
              <GridItem xs={5} md={1}>
                <Box display='flex' alignItems='center' ml={1}>
                  <Alarm style={{ minWidth: '14px', minHeight: '14px' }} />
                  <Box ml={1} />
                  <Typography variant='h4' color='var(--mui-palette-grey-700)'>
                    {hourText}
                  </Typography>
                </Box>
              </GridItem>
            </GridWrapper>
          </Box>
        </SmallDeviceAppointmentCard.Content>
      </SmallDeviceAppointmentCard.Wrapper>
    </SmallDeviceAppointmentCard>
  )
}
