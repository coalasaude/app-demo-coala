import { Box } from '@mui/material'

import { PatientModelType } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import { AvatarInfo } from '@/v3/presentation/components/AvatarInfo'
import { CTooltip } from '@/v3/presentation/newComponents'

interface PatientInfoProps {
  patient?: PatientModelType
}

export const PatientInfo = ({ patient }: PatientInfoProps) => {
  const fullName = patient?.fullName ? patient.fullName : 'Paciente não definido'
  const props = {
    maxWidth: 220,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }

  return (
    <CTooltip description={patient?.fullName}>
      <Box display='flex' alignItems='center'>
        <AvatarInfo
          imageUrl={patient?.imageUrl}
          title={fullName}
          containerProps={props}
          titleProps={props}
        />
      </Box>
    </CTooltip>
  )
}
