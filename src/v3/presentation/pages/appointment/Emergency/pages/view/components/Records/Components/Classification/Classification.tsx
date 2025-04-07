import { Typography } from '@mui/material'

import Pill from '/public/assets/svg/AppointmentsView/Pill.svg'

import { MedicalRecordClassification } from '@/v3/domain/medical-record'
import { getPillColor } from '@/v3/presentation/pages/appointment/Emergency/utils/getPillColor'
import { getMedicalRecordColor } from '@/v3/presentation/pages/appointment/Emergency/utils/getMedicalRecordColor'
import { MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION } from '@/constants/medicalRecordClassification'

import { StyledContainer, StyledPill } from './styles'

interface ClassificationProps {
  classification?: MedicalRecordClassification
}

export const Classification = ({ classification }: ClassificationProps) => {
  const pillColor = getPillColor(classification)
  const color = getMedicalRecordColor(classification)

  return (
    <StyledContainer sx={{ bgcolor: `var(${color})` }}>
      <Typography variant='h6' fontWeight={600}>
        Classificação de risco
      </Typography>

      <StyledPill>
        <Typography variant='body2'>
          {MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[classification || ''] || 'Sem classificação'}
        </Typography>

        <Pill style={{ color: `var(${pillColor})` }} />
      </StyledPill>
    </StyledContainer>
  )
}
