import { GuideTourTypes } from '@/v3/presentation/newComponents/atoms/CJoyride/constants'

type GuideTourProps = {
  handleOpenGuideTourModal: (guideTourType: string) => void
  guideTourResponsible: { isActive: boolean }
  guideTourCollaborator: { isActive: boolean }
  guideTourManager: { isActive: boolean }
  guideTourHealthUnit: { isActive: boolean }
}

export const validateUserAndOpenModal = ({
  guideTourCollaborator,
  guideTourManager,
  guideTourResponsible,
  guideTourHealthUnit,
  handleOpenGuideTourModal,
}: GuideTourProps) => {
  const modalDisplayCount = parseInt(localStorage.getItem('modalDisplayCount') || '0')
  const hasSomeActiveProfile = [
    guideTourResponsible,
    guideTourCollaborator,
    guideTourManager,
    guideTourHealthUnit,
  ].some(({ isActive }) => isActive === true)

  if (modalDisplayCount >= 1 || !hasSomeActiveProfile) return

  if (guideTourManager.isActive) {
    handleOpenGuideTourModal(GuideTourTypes.Manager)
  } else if (guideTourCollaborator.isActive) {
    handleOpenGuideTourModal(GuideTourTypes.Collaborator)
  } else if (guideTourResponsible.isActive) {
    handleOpenGuideTourModal(GuideTourTypes.Responsible)
  } else if (guideTourHealthUnit?.isActive) {
    handleOpenGuideTourModal(GuideTourTypes.Dashboard)
  }
}
