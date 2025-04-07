import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { limit } from '@/constants/api'
import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import { StatusDescription } from '@/constants/status'
import { useHasPermission } from '@/hooks/useHasPermission'
import { bindPathParams } from '@/utils/bindParams'
import { CFilterHeaderTable } from '@/v3/presentation/components/Table'
import { useFetchBrowseUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchBrowseUser'
import { useFetchInstitution } from '@/v3/presentation/hooks/useFetchInstitution'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { PageHeader } from '@/v3/presentation/newComponents'
import { useFetchReadProfile } from '@/v3/presentation/hooks/api/@v2/users/profile/useFetchReadProfile'
import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants/target'
import { useMutateUnlinkRoles } from '@/v3/presentation/hooks/api/@v2/users/roles/useMutateUnlinkRoles'

import { InstitutionalHeader } from '../components/InstitutionalHeader'
import { UserListTable } from '../components/UserListTable'
import { DrawerFilterUserListTable } from '../components/UserListTable/DrawerFilterUserListTable'
import { IUserFilterFields } from '../components/UserListTable/type'

export const UserListPage = () => {
  const router = useRouter()
  const queryParams = router.query as IUserFilterFields
  const { data: institution } = useFetchInstitution(queryParams.institutionId)
  const { profile } = useFetchReadProfile({ profileId: queryParams.profileId })
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)
  const { replaceManyQueryParam } = useUrlQueryControl({})
  const [selectedUsers, setSelectedUsers] = useState(new Set<number>())
  const { mutateAsync: unlinkRoles } = useMutateUnlinkRoles()

  const { users, isPending, refetch } = useFetchBrowseUser({
    limit: limit,
    offset: queryParams.offset,
    orderBy: queryParams.orderBy,
    direction: queryParams.direction,
    searchUser: queryParams.searchUser,
    searchEmail: queryParams.searchEmail,
    searchTelephone: queryParams.searchTelephone,
    status: queryParams.status,
    institutionId: queryParams.institutionId,
    profileId: queryParams.profileId,
  })

  const [canAddUser, canViewUser, canManageRole] = useHasPermission([
    Permissions.ADD_USER,
    Permissions.VIEW_USERS,
    Permissions.MANAGE_ROLE,
  ])

  const onHandleAddUser = () => {
    router.push(
      `${NEW_ROUTES.AUTHENTICATED.USERS.ADD.path}?institutionId=${queryParams.institutionId}`,
    )
  }

  const onHandleEditUser = (userId: number) => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, {
        userId: String(userId || ''),
      }),
    )
  }

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

  const hanldeSelect = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newSelectedUsers = new Set(selectedUsers)
    if (event.target.checked) {
      newSelectedUsers.add(id)
    } else {
      newSelectedUsers.delete(id)
    }
    setSelectedUsers(newSelectedUsers)
  }

  const handleDelete = async () => {
    const userIds = Array.from(selectedUsers)
    await unlinkRoles({ userIds, institutionId: Number(queryParams.institutionId) || 0 })
    refetch()
    setSelectedUsers(new Set())
  }

  return (
    <>
      <PageHeader
        title='Usuários'
        onBack={() => router.push(`${NEW_ROUTES.AUTHENTICATED.USERS.ACCESS.path}`)}
        actionButtonProps={
          canAddUser
            ? {
                id: target.coalaUserPage,
                children: 'Adicionar',
                onClick: onHandleAddUser,
              }
            : undefined
        }
      />
      {queryParams.institutionId ? (
        <InstitutionalHeader institutionId={queryParams.institutionId} />
      ) : null}
      <CFilterHeaderTable
        placeholder='Usuários'
        onSearch={(value) => onSetFilters({ searchUser: value })}
        filterAction={() => setIsOpenFilter(true)}
        inputValue={queryParams.searchUser}
        chipsList={getChipsList()}
        onChipDelete={removeChipFilter}
        deleteButtonLabel={selectedUsers.size ? 'Desvincular usuários selecionados' : undefined}
        deleteButtonAction={selectedUsers.size ? handleDelete : undefined}
        cancelDeleteButtonAction={() => setSelectedUsers(new Set())}
        cancelDeleteButtonLabel='Desmarcar todos'
      />

      <UserListTable
        users={users?.data}
        isLoading={isPending}
        direction={queryParams.direction}
        orderBy={queryParams.orderBy}
        count={users?.pagination.total}
        offset={queryParams.offset}
        onChangePage={(_, offset) => onSetFilters({ offset })}
        setFilters={onSetFilters}
        {...(canViewUser && {
          onClickUserRow: onHandleEditUser,
        })}
        onChangeSelectedUsers={
          canManageRole && queryParams.institutionId ? hanldeSelect : undefined
        }
        selectedUsers={canManageRole && queryParams.institutionId ? selectedUsers : undefined}
        institutionId={Number(queryParams.institutionId)}
      />

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
