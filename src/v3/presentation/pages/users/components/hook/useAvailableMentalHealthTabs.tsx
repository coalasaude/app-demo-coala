import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'

export const useAvailableMentalHealthTabs = () => {
  const [
    canViewPlan,
    canViewInternRecord,
    canViewExternalRecord,
    canViewBehavior,
    canViewChallenge,
    canViewMedicalReport,
    canViewMedicalAnalysis,
    canViewRequestedAnalysis,
    canViewInterestArea,
  ] = useHasPermission([
    Permissions.VIEW_MENTAL_HEALTH_PLAN,
    Permissions.VIEW_INTERN_RECORD,
    Permissions.VIEW_EXTERNAL_RECORD,
    Permissions.VIEW_BEHAVIOUR,
    Permissions.VIEW_CHALLENGE,
    Permissions.CAN_VIEW_MEDICAL_REPORT,
    Permissions.CAN_VIEW_MEDICAL_ANALYSIS,
    Permissions.CAN_VIEW_REQUESTED_ANALYSIS,
    Permissions.LIST_INTEREST_AREA,
  ])

  const canViewAnalysis = canViewMedicalReport || canViewMedicalAnalysis || canViewRequestedAnalysis

  const canViewRecord =
    canViewInternRecord ||
    canViewExternalRecord ||
    canViewBehavior ||
    canViewChallenge ||
    canViewInterestArea

  const tabsNames = [
    canViewPlan && 'PEI/PDI',
    canViewAnalysis && 'Laudos e relatórios',
    canViewRecord && 'Registros pedagógicos',
  ].filter(Boolean) as string[]

  const canViewLearning = canViewPlan || canViewAnalysis || canViewRecord
  const canViewPermissions = {
    canViewPlan,
    canViewInternRecord,
    canViewExternalRecord,
    canViewBehavior,
    canViewChallenge,
    canViewMedicalReport,
    canViewMedicalAnalysis,
    canViewRequestedAnalysis,
    canViewInterestArea,
  }

  const result = {
    tabsNames,
    canViewPlan,
    canViewAnalysis,
    canViewRecord,
    canViewLearning,
    canViewPermissions,
  }

  return result
}
