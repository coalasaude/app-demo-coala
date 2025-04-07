import { Box, Typography } from '@mui/material'
import Router from 'next/router'
import { get } from 'lodash'

import { MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION } from '@/constants/medicalRecordClassification'
import { Appointment } from '@/v3/domain/Appointment'

import { getMedicalRecordColor } from '../../utils/getMedicalRecordColor'
import { AppointmentPill } from '../AppointmentPill'
import { getPillColor } from '../../utils/getPillColor'

export const ChipData = ({ data }: { data?: Appointment }) => {
  const medicalRecordLastStatus = get(data, 'medicalRecords.[0].classification')
  const color = getMedicalRecordColor(medicalRecordLastStatus || '')
  const pillColor = getPillColor(medicalRecordLastStatus || '')

  return (
    <Box
      bgcolor={`var(${color})`}
      p={1}
      display='flex'
      justifyContent='space-between'
      style={{ borderRadius: '8px' }}
    >
      <Typography variant='h6'>Ticket - {Router.query.id}</Typography>
      <AppointmentPill
        title={
          data?.medicalRecords?.[0]?.classification
            ? MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[data?.medicalRecords?.[0].classification]
            : 'Sem classificação'
        }
        color={pillColor}
      />
    </Box>
  )
}

export default ChipData
