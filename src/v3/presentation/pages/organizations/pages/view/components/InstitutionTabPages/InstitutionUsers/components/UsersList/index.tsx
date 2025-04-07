import { Box } from '@mui/material'
import { useState } from 'react'

import { limit } from '@/constants/api'
import { StatusDescription } from '@/constants/status'
import { CostCenter } from '@/v3/domain/organizations/Organization'
import { CFilterHeaderTable } from '@/v3/presentation/components/Table'
import { useFetchBrowseUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchBrowseUser'
import { useFetchInstitution } from '@/v3/presentation/hooks/useFetchInstitution'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { UserListTable } from '@/v3/presentation/pages/users/components/UserListTable'
import { DrawerFilterUserListTable } from '@/v3/presentation/pages/users/components/UserListTable/DrawerFilterUserListTable'
import { IUserFilterFields } from '@/v3/presentation/pages/users/components/UserListTable/type'
import { useFetchReadProfile } from '@/v3/presentation/hooks/api/@v2/users/profile/useFetchReadProfile'
import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'
import { CButtonGroup } from '@/v3/presentation/newComponents/molecules/CButtonGroup'
import { UserSummaryModel } from '@/v3/domain/@v2/users/users-summary.model'

type Props = {
  currentOrg: number
  orgType: CostCenter
  queryParams: IUserFilterFields
  onHandleEditUser?: (userId: number) => void
  handleSelect?: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void
  handleDelete?: () => void
  handleNotifyUser?: (userId: number, name: string) => void
  buttonArray?: JSX.Element[]
  onlyInactiveProfiles?: boolean
  onReactivateUser?: (user: UserSummaryModel) => void
  selectedUsers?: Set<number>
  setSelectedUsers?: (value: Set<number>) => void
}

export const UsersList = ({
  currentOrg,
  orgType,
  buttonArray,
  queryParams,
  handleDelete,
  handleNotifyUser,
  handleSelect,
  onHandleEditUser,
  onReactivateUser,
  onlyInactiveProfiles,
  selectedUsers,
  setSelectedUsers,
}: Props) => {
  const { data: institution } = useFetchInstitution(queryParams.institutionId)
  const { profile } = useFetchReadProfile({ profileId: queryParams.profileId })
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)
  const { replaceManyQueryParam } = useUrlQueryControl({})

  const orgDictionary: Record<CostCenter, Record<string, number>> = {
    [CostCenter.BRAND]: { brandId: Number(currentOrg) },
    [CostCenter.INSTITUTION]: { institutionId: Number(currentOrg) },
    [CostCenter.NETWORK]: { networkId: Number(currentOrg) },
  }

  const [canViewUser, canManageRole] = useHasPermission([
    Permissions.VIEW_USERS,
    Permissions.MANAGE_ROLE,
  ])

  const {
    users,
    isPending: isLoadingUser,
    refetch,
  } = useFetchBrowseUser({
    limit: limit,
    offset: queryParams.offset,
    orderBy: queryParams.orderBy,
    direction: queryParams.direction,
    searchUser: queryParams.searchUser,
    searchEmail: queryParams.searchEmail,
    searchTelephone: queryParams.searchTelephone,
    status: queryParams.status,
    profileId: queryParams.profileId,
    onlyInactiveProfiles,
    ...orgDictionary[orgType],
  })

  const onSetFilters = (filters: IUserFilterFields) => {
    if (!filters.offset) filters.offset = 0
    replaceManyQueryParam(filters)
  }

  const removeChipFilter = (deleteChip: string) => {
    const newQueryParams = { ...queryParams }
    for (const [key, value] of Object.entries(newQueryParams)) {
      if (value === deleteChip) {
        newQueryParams[key as keyof IUserFilterFields] = undefined
      }
    }
    onSetFilters(newQueryParams)
  }

  const getChipsList = () => {
    const chipsList = []

    if (queryParams.institutionId) {
      chipsList.push({
        label: `Instituição: ${institution?.getFantasyName() || ''}`,
        value: queryParams.institutionId,
      })
    }
    if (queryParams.searchEmail) {
      chipsList.push({ label: queryParams.searchEmail, value: queryParams.searchEmail })
    }
    if (queryParams.searchTelephone) {
      chipsList.push({ label: queryParams.searchTelephone, value: queryParams.searchTelephone })
    }
    if (queryParams.status) {
      chipsList.push({ label: StatusDescription[queryParams.status], value: queryParams.status })
    }

    if (queryParams.profileId) {
      chipsList.push({
        label: `Perfis: ${profile?.name || ''}`,
        value: queryParams.profileId,
      })
    }

    return chipsList
  }

  return (
    <>
      <Box mx={1}>
        <CFilterHeaderTable
          boxProps={{ my: 2, mx: 1 }}
          placeholder='Usuários'
          inputValue={queryParams.searchUser}
          onSearch={(value) => onSetFilters({ searchUser: value })}
          filterAction={() => setIsOpenFilter(true)}
          chipsList={getChipsList()}
          onChipDelete={removeChipFilter}
          deleteButtonLabel={selectedUsers?.size ? 'Desvincular usuários selecionados' : undefined}
          deleteButtonAction={
            selectedUsers?.size && handleDelete
              ? () => {
                  handleDelete()
                  refetch()
                }
              : undefined
          }
          cancelDeleteButtonAction={
            setSelectedUsers ? () => setSelectedUsers(new Set()) : undefined
          }
          cancelDeleteButtonLabel='Desmarcar todos'
        >
          {buttonArray && buttonArray?.length > 0 && (
            <CButtonGroup primary='split' orientation='horizontal' size='small' variant='primary'>
              {buttonArray}
            </CButtonGroup>
          )}
        </CFilterHeaderTable>
      </Box>

      <Box mx={2}>
        <UserListTable
          brandId={orgType === CostCenter.BRAND ? currentOrg : undefined}
          networkId={orgType === CostCenter.NETWORK ? currentOrg : undefined}
          users={users?.data}
          isLoading={isLoadingUser}
          direction={queryParams.direction}
          orderBy={queryParams.orderBy}
          count={users?.pagination.total}
          offset={queryParams.offset}
          onChangePage={(_, offset) => onSetFilters({ offset })}
          setFilters={onSetFilters}
          {...(canViewUser &&
            onHandleEditUser && {
              onClickUserRow: onHandleEditUser,
            })}
          onChangeSelectedUsers={
            canManageRole && orgType === CostCenter.INSTITUTION && handleSelect
              ? handleSelect
              : undefined
          }
          selectedUsers={
            canManageRole && orgType === CostCenter.INSTITUTION && selectedUsers
              ? selectedUsers
              : undefined
          }
          onNotifyUser={
            canManageRole && orgType === CostCenter.INSTITUTION && handleNotifyUser
              ? handleNotifyUser
              : undefined
          }
          onReactivateUser={
            onReactivateUser
              ? (user) => {
                  onReactivateUser(user)
                  refetch()
                }
              : undefined
          }
          institutionId={currentOrg}
        />
      </Box>
      <DrawerFilterUserListTable
        setFilters={onSetFilters}
        filters={queryParams}
        open={isOpenFilter}
        onClose={() => setIsOpenFilter(false)}
        profiles={users?.filters?.profiles || []}
      />
    </>
  )
}

export default UsersList
