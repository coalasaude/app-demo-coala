import type { Step } from 'react-joyride'

import { ManagerSteps } from './managerSteps'
import { CollaboratorSteps } from './collaboratorSteps'
import { ResponsibleSteps } from './responsibleSteps'
import { DashboardSteps } from './dashboardSteps'

export const GuideTourTypes = {
  Manager: 'Manager',
  Collaborator: 'Collaborator',
  Responsible: 'Responsible',
  Dashboard: 'Dashboard',
}

export const Steps = (guideTourType: string): Step[] => {
  const stepsMap: Record<string, Step[]> = {
    Manager: ManagerSteps,
    Collaborator: CollaboratorSteps,
    Responsible: ResponsibleSteps,
    Dashboard: DashboardSteps,
  }

  return stepsMap[guideTourType] || ResponsibleSteps
}
