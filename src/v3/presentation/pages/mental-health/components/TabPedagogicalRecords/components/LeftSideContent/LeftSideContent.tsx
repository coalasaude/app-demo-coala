import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined'
import { Box, Stack, Typography } from '@mui/material'

import { PedagogicalRecordType } from '@/v3/domain/@v2/mental-health/enums/pedagogical-record-type.enum'
import { CButton } from '@/v3/presentation/newComponents'
import { useAvailableMentalHealthManage } from '@/v3/presentation/pages/users/components/hook/useAvailableMentalHealthManage'

import { Addbutton } from '../Addbutton/Addbutton'

type LeftSideContentProps = {
  setRegisterType: (value: PedagogicalRecordType | null) => void
  selectedRegisterType: PedagogicalRecordType | null
}

export const LeftSideContent = ({
  setRegisterType,
  selectedRegisterType,
}: LeftSideContentProps) => {
  const handleAllRegister = () => {
    setRegisterType(null)
  }

  const {
    permissionsMentalHealth: {
      canManageInterRecord,
      canManageExternalRecord,
      canManageBehaviour,
      canManageChallenge,
      canManageInterestArea,
    },
  } = useAvailableMentalHealthManage()

  return (
    <Box>
      <CButton
        variant={!selectedRegisterType ? 'primary' : 'secondary'}
        fullWidth
        sx={{ height: 56 }}
        onClick={handleAllRegister}
      >
        <ContentPasteOutlinedIcon color='inherit' sx={{ fontSize: 20, mr: 1 }} />
        <Typography variant='h5' color='inherit'>
          Todos os registros
        </Typography>
      </CButton>
      <Box
        sx={{
          borderTop: '2px dashed',
          borderColor: 'var(--mui-palette-grey-200)',
          marginTop: '10px',
          marginBottom: '10px',
          px: '12px',
        }}
      />
      <Typography
        fontSize={16}
        mb={1}
        sx={{ fontWeight: 'bold', color: 'var(--mui-palette-grey-500)' }}
      >
        Adicionar registro
      </Typography>
      <Stack spacing={1}>
        {canManageChallenge && (
          <Addbutton
            active={selectedRegisterType == PedagogicalRecordType.DIFFICULTIES_OR_CHALLENGES}
            text='Dificuldades ou desafios'
            onClick={() => setRegisterType(PedagogicalRecordType.DIFFICULTIES_OR_CHALLENGES)}
          />
        )}
        {canManageBehaviour && (
          <Addbutton
            active={selectedRegisterType == PedagogicalRecordType.BEHAVIORS}
            text='Comportamentos'
            onClick={() => setRegisterType(PedagogicalRecordType.BEHAVIORS)}
          />
        )}
        {canManageInterestArea && (
          <Addbutton
            active={selectedRegisterType == PedagogicalRecordType.AREAS_OF_INTEREST}
            text='Áreas de interesse'
            onClick={() => setRegisterType(PedagogicalRecordType.AREAS_OF_INTEREST)}
          />
        )}
        {canManageExternalRecord && (
          <Addbutton
            active={selectedRegisterType == PedagogicalRecordType.EXTERNAL_RECORDS}
            text='Registros externos'
            onClick={() => setRegisterType(PedagogicalRecordType.EXTERNAL_RECORDS)}
          />
        )}
        {canManageInterRecord && (
          <Addbutton
            active={selectedRegisterType == PedagogicalRecordType.COALA_RECORDS}
            text='Registros da Coala'
            onClick={() => setRegisterType(PedagogicalRecordType.COALA_RECORDS)}
          />
        )}
      </Stack>
    </Box>
  )
}
