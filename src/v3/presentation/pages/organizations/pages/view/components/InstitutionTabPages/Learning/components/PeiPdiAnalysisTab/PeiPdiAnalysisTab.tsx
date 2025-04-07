import { Typography } from '@mui/material'

import { CContainerContent, CDivider } from '@/v3/presentation/newComponents'

import PeiPdiAnalysisHeader from './PeiPdiAnalysisHeader/PeiPdiAnalysisHeader'
import PeiPdiAnalysisBody from './PeiPdiAnalysisBody/PeiPdiAnalysisBody'

const PeiPdiAnalysisTab = () => {
  return (
    <CContainerContent
      title={'Planos'}
      subtitle={
        <Typography variant='body2' color='var(--mui-palette-grey-500)'>
          Nessa aba você pode acompanhar o andamento geral dos PEI/PDI criados na sua instituição.
        </Typography>
      }
      styleContainer={{ px: 0, py: 2 }}
      noBorder
    >
      <PeiPdiAnalysisHeader />

      <CDivider sx={{ my: 4 }} />

      <PeiPdiAnalysisBody />
    </CContainerContent>
  )
}

export default PeiPdiAnalysisTab
