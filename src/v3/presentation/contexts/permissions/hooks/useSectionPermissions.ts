import { Sections } from '../permissions.provider'

import { useAppointmentPermission } from './useAppointmentPermission'
import { useDependentPermission } from './useDependentPermission'
import { useManageHealthUnit } from './useManageHealthUnit'
import { useMedicalRecordPermission } from './useMedicalRecordPermission'
import { useOrganizationPermission } from './useOrganizationsPermission'

export const useSectionPermissions = (): Record<Sections, boolean> => {
  const hasAppointmentPermission = useAppointmentPermission()
  const hasMedicalRecordPermission = useMedicalRecordPermission()
  const hasDependentPermission = useDependentPermission()
  const hasManageHealthUnit = useManageHealthUnit()
  const hasManageOrganizationsPermission = useOrganizationPermission()

  return {
    [Sections.HOME]: true,
    [Sections.APPOINTMENT]: hasAppointmentPermission,
    [Sections.MENTAL_HEALTH]: false,
    [Sections.COURSE]: true,
    [Sections.MATERIALS]: true,
    [Sections.DEPENDENT]: hasDependentPermission,
    [Sections.DASHBOARD]: false,
    [Sections.SCHEDULED_MEDICINE]: false,
    [Sections.MEDICAL_RECORD]: hasMedicalRecordPermission,
    [Sections.PROFILE]: false,
    [Sections.IA]: true,
    [Sections.HEALTH_UNIT]: hasManageHealthUnit,
    [Sections.ORGANIZATION]: hasManageOrganizationsPermission,
  }
}
