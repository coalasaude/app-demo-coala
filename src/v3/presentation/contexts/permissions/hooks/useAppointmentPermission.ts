import React from 'react'

import { InstitutionConfig } from '@/constants/institutionConfig'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { Permissions } from '@/constants/permissions'

export const useAppointmentPermission = () => {
  const { auth } = useAuth()

  const hasEmergencyProduct = React.useMemo(() => {
    const hasPermissionOnInstitutionByUser = auth.institutionalSettings?.some(
      ({ name }) => name === InstitutionConfig.EMERGENCY_CALLCENTER,
    )

    const hasPermissionByUser = auth.permissions?.some(
      (permission) => permission.name === Permissions.VIEW_APPOINTMENT,
    )

    return Boolean(hasPermissionOnInstitutionByUser || hasPermissionByUser)
  }, [auth.institutionalSettings, auth.permissions])

  return hasEmergencyProduct
}
