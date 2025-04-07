import { useMentalHealthContext } from '../../contexts/mental-health.provider'
import MentalHealthAppBar from '../MentalHealthAppBar'

export default function PageWrapper() {
  const { userViewConfig, activeTab } = useMentalHealthContext()
  return (
    <>
      <MentalHealthAppBar />
      {userViewConfig?.tabs?.[activeTab].component}
    </>
  )
}
