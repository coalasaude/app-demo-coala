import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { TApiInstitution } from '@/v3/domain/api/organizations/ApiOrganizationResponse'
import { getInstitution } from '@/v3/infra/services/organizations/institution'
import { Institution } from '@/v3/domain/organizations/Organization'
import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'

import { useFetch } from '../../../useFetch'

export const useFetchInstitution = (
  institutionId?: number,
  options?: { selectUserProfileCount?: boolean },
) => {
  const { data: response, ...rest } = useFetch<TApiInstitution>({
    queryFn: () => {
      if (!institutionId) return Promise.resolve(null)
      return getInstitution(institutionId, options)
    },
    queryKey: [QueryKeyEnum.COST_CENTER_INSTITUTION, institutionId, options],
  })
  const [canView, canImportByCsv, canUpdateInstitution, canEditOwnOrganization, canExportUsers] =
    useHasPermission([
      Permissions.VIEW_ORGANIZATIONS,
      Permissions.ADD_USERS_BY_BATCH,
      Permissions.MANAGE_ORGANIZATION,
      Permissions.EDIT_OWN_ORGANIZATION,
      Permissions.EXPORT_USERS,
    ])

  const data = response ? new Institution(response) : null

  return {
    data,
    canView,
    canImportByCsv,
    canUpdateInstitution,
    canEditOwnOrganization,
    canExportUsers,
    ...rest,
  }
}
