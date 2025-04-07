import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Box, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag'

import { CContainerContent } from '@/v3/presentation/newComponents'
import { CCardColor, CCardColorMainContent } from '@/v3/presentation/newComponents/atoms/CCardColor'
import { useFetchReadDataInstitutionRequestedAnalysis } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/request-analysis/useFetchReadDataInstitutionRequestedAnalysis'

export const RequestedAnalysisHeader = ({ institutionId }: { institutionId: number }) => {
  const { data } = useFetchReadDataInstitutionRequestedAnalysis({ institutionId })

  return (
    <CContainerContent
      title={'Laudos e relatórios'}
      subtitle={
        <Typography variant='body2' color='var(--mui-palette-grey-500)'>
          Acompanhe o andamento das solicitações de análise de laudos e relatórios da sua
          instituição.
        </Typography>
      }
      styleContainer={{ px: 0, py: 2 }}
      noBorder
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}>
        <CCardColor state='info' boxProps={{ width: ['100%', '30%'] }}>
          <CCardColorMainContent
            Icon={AccessTimeIcon}
            number={data?.awaitingAnalysis || 0}
            title='Solicitações aguardando análise'
            titleColor='var(--mui-palette-info-main)'
          />
        </CCardColor>
        <CCardColor state='success' boxProps={{ width: ['100%', '30%'] }}>
          <CCardColorMainContent
            Icon={CheckCircleOutlineIcon}
            number={data?.availableAnalysis || 0}
            title='Solicitações com análise disponível'
            titleColor='var(--mui-palette-success-main)'
          />
        </CCardColor>
        <CCardColor state='warning' boxProps={{ width: ['100%', '30%'] }}>
          <CCardColorMainContent
            Icon={OutlinedFlagIcon}
            number={data?.reportsAdded || 0}
            title='Laudos adicionados'
            titleColor='var(--mui-palette-warning-main)'
          />
        </CCardColor>
      </Box>
    </CContainerContent>
  )
}
