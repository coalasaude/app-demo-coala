import { CButtonGroup } from '@/v3/presentation/newComponents/molecules/CButtonGroup'
import { CButton } from '@/v3/presentation/newComponents'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'

import { RequestedAnalysisList } from './components/RequestedAnalysisList'
import PeiPdiAnalysisTab from './components/PeiPdiAnalysisTab/PeiPdiAnalysisTab'

enum Tabs {
  PEI_PDI = 'PEI_PDI',
  REPORTS = 'REPORTS',
}

export const LearningTab = ({ institutionId }: { institutionId: number }) => {
  const { queryParam, setQueryParam } = useUrlQueryControl({
    queryName: 'learningTab',
    defaultValue: Tabs.PEI_PDI,
  })

  const selectedIndex = queryParam === Tabs.PEI_PDI ? 0 : 1

  const handleTabChange = (tab: Tabs) => {
    setQueryParam(tab)
  }

  return (
    <CBaseContainer sx={{ px: 2, pt: 2 }}>
      <CButtonGroup
        orientation='horizontal'
        size='small'
        variant='secondary'
        selectedIndex={selectedIndex}
      >
        <CButton key={1} onClick={() => handleTabChange(Tabs.PEI_PDI)}>
          PEI/PDI
        </CButton>
        <CButton key={2} onClick={() => handleTabChange(Tabs.REPORTS)}>
          Laudos e relatórios
        </CButton>
      </CButtonGroup>
      {queryParam === Tabs.REPORTS && <RequestedAnalysisList institutionId={institutionId} />}
      {queryParam === Tabs.PEI_PDI && <PeiPdiAnalysisTab />}
    </CBaseContainer>
  )
}

export default LearningTab
