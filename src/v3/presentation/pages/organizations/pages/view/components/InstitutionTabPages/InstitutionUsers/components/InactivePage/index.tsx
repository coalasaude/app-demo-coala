import { CostCenter } from '@/v3/domain/organizations/Organization'
import { IUserFilterFields } from '@/v3/presentation/pages/users/components/UserListTable/type'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { UserSummaryModel } from '@/v3/domain/@v2/users/users-summary.model'
import { useMutateLinkRole } from '@/v3/presentation/hooks/api/@v2/users/roles/useMutateLinkRole'

import UsersList from '../UsersList'

import { ConfirmationModal } from './modal/ConfirmationModal'
import { InstitutionModal } from './modal/InstitutionsModal'

type InactivePageProps = {
  currentOrg?: number
  orgType: CostCenter
  queryParams: IUserFilterFields
}

export const InactivePage = ({ currentOrg, orgType, queryParams }: InactivePageProps) => {
  const { mutateAsync: linkRole } = useMutateLinkRole()
  const { handleModal } = useModalContext()

  const onReactivateUser = async ({
    userId,
    profileId,
    institutionId,
  }: {
    userId: number
    profileId: number
    institutionId: number
  }) => {
    await linkRole({
      userId,
      profileId,
      institutionId,
    })
  }

  const handleReactivateUser = (user: UserSummaryModel) => {
    const mapperRoles = {
      [CostCenter.NETWORK]: user.getInstitutionsByNetworkId(currentOrg || 0),
      [CostCenter.BRAND]: user.getInstitutionsByBrandId(currentOrg || 0),
      [CostCenter.INSTITUTION]: user.roles.filter((role) => role.institutionId === currentOrg),
    }
    const roles = mapperRoles[orgType]
    const modal =
      roles.length === 1 ? (
        <ConfirmationModal
          onConfirm={async (profileId: number, institutionId: number) =>
            await onReactivateUser({
              userId: user.id,
              profileId,
              institutionId,
            })
          }
          roles={roles}
          userName={user.getFullName()}
        />
      ) : (
        <InstitutionModal
          roles={roles}
          onConfirm={async (profileId: number, institutionId: number) =>
            await onReactivateUser({
              userId: user.id,
              profileId,
              institutionId,
            })
          }
        />
      )

    handleModal(modal)
  }

  return (
    <UsersList
      currentOrg={currentOrg || 0}
      orgType={orgType}
      queryParams={queryParams}
      onReactivateUser={handleReactivateUser}
      onlyInactiveProfiles={true}
    />
  )
}

export default InactivePage
