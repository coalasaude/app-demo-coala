import { MentalHealthProvider } from './contexts/mental-health.provider'
import PageWrapper from './components/PageWrapper'

export default function MentalHealth() {
  return (
    <MentalHealthProvider>
      <PageWrapper />
    </MentalHealthProvider>
  )
}
