import { Box, Grid, Typography } from '@mui/material'

import { MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION } from '@/constants/medicalRecordClassification'
import { UsersInCallModelType } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import { MedicalRecord } from '@/v3/domain/medical-record'
import {
  CAccordion,
  CAccordionBody,
  CBaseContainer,
  CDisplayRecord,
  CDivider,
} from '@/v3/presentation/newComponents'
import { CVideoCallAttendants } from '@/v3/presentation/newComponents/layout/CVideoCallAttendants'
import { getPillColor } from '@/v3/presentation/pages/appointment/Emergency/utils/getPillColor'

import { AppointmentPill } from './AppointmentPill'

type Props = {
  users: UsersInCallModelType[]
  medicalRecord?: MedicalRecord
}

export const VideoCallResume = ({ medicalRecord, users = [] }: Props) => {
  const color = getPillColor(medicalRecord?.classification)
  const classification = medicalRecord?.classification
    ? MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[medicalRecord.classification]
    : 'Sem classificação'

  return (
    <CBaseContainer sx={{ height: '100%', overflowY: 'auto' }} title='Registro de atendimento'>
      <Typography variant='body2'>
        {users?.length > 0 ? 'Presentes na chamada' : 'Ainda não há participantes na chamada'}
      </Typography>
      <Box display='flex' alignItems='center'>
        {users.map((user) => {
          return <CVideoCallAttendants key={user.id} user={user} />
        })}
      </Box>
      <CDivider />
      <Box py={2} display='flex' alignItems='flex-start' justifyContent='space-between'>
        <Typography variant='h5'>Classificação de risco</Typography>
        <AppointmentPill title={classification || '-'} color={color} />
      </Box>
      <CDivider />
      <Box pt={2}>
        <CAccordion title='Sinais vitais' sx={{ background: 'var(--mui-palette-grey-100)' }}>
          <CAccordionBody>
            <Grid container p={2}>
              <Grid item xs={6} md={6} lg={6}>
                <CDisplayRecord
                  label='Pressão arterial (mmHg)'
                  value={medicalRecord?.diastolic}
                  labelProps={{ variant: 'h5', color: 'var(--mui-palette-grey-600)' }}
                  withDivider={false}
                  valueProps={{ color: 'var(--mui-palette-grey-500)' }}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <CDisplayRecord
                  label='F. cardíaca (bpm)'
                  value={medicalRecord?.heartRate}
                  labelProps={{ variant: 'h5', color: 'var(--mui-palette-grey-600)' }}
                  withDivider={false}
                  valueProps={{ color: 'var(--mui-palette-grey-500)' }}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <CDisplayRecord
                  label='F. respiratória (irpm)'
                  value={medicalRecord?.respiratoryFrequency}
                  labelProps={{ variant: 'h5', color: 'var(--mui-palette-grey-600)' }}
                  withDivider={false}
                  valueProps={{ color: 'var(--mui-palette-grey-500)' }}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <CDisplayRecord
                  label='Temperatura (°C)'
                  value={medicalRecord?.bodyTemperature}
                  labelProps={{ variant: 'h5', color: 'var(--mui-palette-grey-600)' }}
                  withDivider={false}
                  valueProps={{ color: 'var(--mui-palette-grey-500)' }}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <CDisplayRecord
                  label='Saturação O2 (%)'
                  value={medicalRecord?.oxygenSaturation}
                  labelProps={{ variant: 'h5', color: 'var(--mui-palette-grey-600)' }}
                  withDivider={false}
                  valueProps={{ color: 'var(--mui-palette-grey-500)' }}
                />
              </Grid>
            </Grid>
          </CAccordionBody>
        </CAccordion>
      </Box>
      <Box pt={2}>
        <CDisplayRecord
          label='Relato'
          value={medicalRecord?.history || '-'}
          withDivider={false}
          labelProps={{ variant: 'h4', color: 'var(--mui-palette-grey-600)' }}
          valueProps={{ variant: 'body1', color: 'var(--mui-palette-grey-500)' }}
        />
      </Box>
    </CBaseContainer>
  )
}

export default VideoCallResume
