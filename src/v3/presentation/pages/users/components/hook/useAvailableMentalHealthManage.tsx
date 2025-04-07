import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'

export const useAvailableMentalHealthManage = () => {
  const [
    canWriteComment,
    canManagePlan,
    canManageInterRecord,
    canManageExternalRecord,
    canManageDocumentRecords,
    canManageBehaviour,
    canManageChallenge,
    canManageInterestArea,
    canManageMedicalReport,
    canManageMedicalAnalysis,
    canManageRequestedAnalysis,
  ] = useHasPermission([
    Permissions.WRITE_MENTAL_HEALTH_COMMENT,
    Permissions.MANAGE_MENTAL_HEALTH_PLAN,
    Permissions.MANAGE_INTERN_RECORD,
    Permissions.MANAGE_EXTERNAL_RECORD,
    Permissions.MANAGE_DOCUMENT_MENTAL_HEALTH_RECORDS,
    Permissions.MANAGE_BEHAVIOUR,
    Permissions.MANAGE_CHALLENGE,
    Permissions.MANAGE_INTEREST_AREA,
    Permissions.MANAGE_MEDICAL_REPORT,
    Permissions.MANAGE_MEDICAL_ANALYSIS,
    Permissions.MANAGE_REQUESTED_ANALYSIS,
  ])

  const canManageMentalHealthPlan = canManagePlan || canWriteComment

  const canManageAnalysis =
    canManageMedicalReport || canManageMedicalAnalysis || canManageRequestedAnalysis

  const canManageRecord =
    canManageInterRecord ||
    canManageExternalRecord ||
    canManageBehaviour ||
    canManageChallenge ||
    canManageInterestArea

  const permissionsMentalHealth = {
    canWriteComment,
    canManagePlan,
    canManageInterRecord,
    canManageExternalRecord,
    canManageDocumentRecords,
    canManageBehaviour,
    canManageChallenge,
    canManageInterestArea,
    canManageMedicalReport,
    canManageMedicalAnalysis,
    canManageRequestedAnalysis,
  }

  const result = {
    canManageMentalHealthPlan,
    canManageAnalysis,
    canManageRecord,
    permissionsMentalHealth,
  }

  return result
}
