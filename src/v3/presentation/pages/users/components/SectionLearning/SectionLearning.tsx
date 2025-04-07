import { UserModel } from '@/v3/domain/@v2/users/users.model'
import Paper from '@/v3/presentation/components/Paper'
import CTabs from '@/v3/presentation/components/TabsContainer'

import TabPedagogicalRecords from '../../../mental-health/components/TabPedagogicalRecords/TabPedagogicalRecords'
import TabPeiPdi from '../../../mental-health/components/TabPeiPdi/TabPeiPdi'
import { TabReportsAndAssessments } from '../../../mental-health/components/TabReportsAndAssessments/TabReportsAndAssessments'
import { useAvailableMentalHealthTabs } from '../hook/useAvailableMentalHealthTabs'

interface SectionLearningProps {
  user: UserModel
}

const SectionLearning = ({ user }: SectionLearningProps) => {
  const { tabsNames, canViewAnalysis, canViewPlan, canViewRecord } = useAvailableMentalHealthTabs()

  return (
    <Paper noBorder>
      <CTabs
        tabsNames={tabsNames}
        key={1}
        isLoading={false}
        tabsBody={[
          canViewPlan && <TabPeiPdi key={0} user={user} />,
          canViewAnalysis && <TabReportsAndAssessments key={1} user={user} />,
          canViewRecord && <TabPedagogicalRecords key={2} user={user} />,
        ]}
      />
    </Paper>
  )
}

export default SectionLearning
