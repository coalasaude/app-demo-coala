import { Box, Grid, Paper, Stack } from '@mui/material'

import { CContainerContent, CDisplayRecord } from '@/v3/presentation/newComponents'
import CLogo from '@/v3/presentation/newComponents/atoms/CLogo'

import { overflowVisible } from '../../utils/style'

interface ProfessionalData {
  fullName?: string
  cpf?: string
  email?: string
  registration?: string
  isNurse?: boolean
}

interface ProfessionalProps {
  isActive?: boolean
  data?: ProfessionalData
}

export const Professional = ({ data, isActive = true }: ProfessionalProps) => {
  return (
    <Paper sx={{ boxShadow: 'none', ...overflowVisible }}>
      <CContainerContent>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent='center'
          alignItems={{ xs: 'flex-start', md: 'center' }}
          gap={{ xs: 2, md: 5 }}
        >
          <Box p={1} ml={{ xs: -1.5, md: 0 }}>
            <CLogo
              size={32}
              variant='brand'
              color={!isActive ? 'var(--mui-palette-grey-400)' : undefined}
            />
          </Box>

          <Grid container spacing={1}>
            <Grid item xs={6} md={4}>
              <CDisplayRecord
                label={data?.isNurse ? 'Enfermeiro' : 'Médico'}
                value={data?.fullName}
                withDivider={false}
              />
            </Grid>

            <Grid item xs={6}>
              <CDisplayRecord
                label={data?.isNurse ? 'COREN' : 'CRM'}
                value={data?.registration}
                withDivider={false}
              />
            </Grid>
          </Grid>
        </Stack>
      </CContainerContent>
    </Paper>
  )
}
