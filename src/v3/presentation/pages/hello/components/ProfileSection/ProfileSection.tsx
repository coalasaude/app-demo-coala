import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { CollaboratorSection } from './components/CollaboratorSection/CollaboratorSection'
import { HealthLeaderSection } from './components/HealthLeaderSection/HealthLeaderSection'
import { ManagerSection } from './components/ManagerSection/ManagerSection'
import { ResponsibleSection } from './components/ResponsibleSection/ResponsibleSection'

export default function ProfileSection({
  institutionId,
  isMobile,
}: {
  isMobile: boolean
  institutionId: number
}) {
  const { auth } = useAuth()

  const isAdmin = auth.user?.isAdmin || auth.user?.isMedical
  if (isAdmin) return <CollaboratorSection />

  const role = auth.user?.roles.find((role) => role.institution?.id === institutionId)

  if (role?.profile.IsManager)
    return <ManagerSection institutionId={institutionId} isMobile={isMobile} />

  if (role?.isHealthLeader)
    return <HealthLeaderSection institutionId={institutionId} isMobile={isMobile} />

  if (auth.user?.isResponsible) return <ResponsibleSection />

  return <CollaboratorSection />
}
