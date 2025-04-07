import { useRouter } from 'next/router'
import { useState } from 'react'

import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import { useHasPermission } from '@/hooks/useHasPermission'
import { bindPathParams } from '@/utils/bindParams'
import { CostCenter } from '@/v3/domain/organizations/Organization'
import { IUserFilterFields } from '@/v3/presentation/pages/users/components/UserListTable/type'
import { useMutateUnlinkRoles } from '@/v3/presentation/hooks/api/@v2/users/roles/useMutateUnlinkRoles'
import { CButton } from '@/v3/presentation/newComponents'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateExportUsers } from '@/v3/presentation/hooks/api/@v2/users/export/useMutateExportUsers'
import { useMutateNotifyActivateUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateNotifyActivateUser'

import { NotificationModal } from '../../../Import/components'
import UsersList from '../UsersList'

type ActivatePageProps = {
  currentOrg?: number
  orgType: CostCenter
  canExportUsers: boolean
  canImportByCsv: boolean
  queryParams: IUserFilterFields
}

export const ActivatePage = ({
  currentOrg,
  orgType,
  canExportUsers,
  canImportByCsv,
  queryParams,
}: ActivatePageProps) => {
  const router = useRouter()
  const [selectedUsers, setSelectedUsers] = useState(new Set<number>())
  const { mutateAsync: unlinkRoles } = useMutateUnlinkRoles()
  const { handleModal } = useModalContext()
  const { mutateAsync: exportUsers } = useMutateExportUsers()
  const { mutateAsync: notifyUser } = useMutateNotifyActivateUser()

  const [canAddUser] = useHasPermission([Permissions.ADD_USER])

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

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
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
    await unlinkRoles({ userIds, institutionId: currentOrg || 0 })
    setSelectedUsers(new Set())
  }

  const handleExportUsers = () => {
    const onConfirm = async () => {
      const institutionId = Number(router.query.id as string)
      await exportUsers({ institutionId })
    }

    handleModal(
      <CDialogue
        title='Atenção!'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onConfirm}
        description={<span>Tem certeza de que gostaria de exportar os dados dos usuários?</span>}
      />,
    )
  }

  const handleSendNotification = () => {
    handleModal(<NotificationModal />)
  }

  const handleNotifyUser = (userId: number, name: string) => {
    const action = async () => {
      await notifyUser({
        userId,
        institutionId: Number(router.query.id as string),
      })
    }

    handleModal(
      <CDialogue
        confirmButtonLabel='Enviar'
        onConfirm={async () => action()}
        title='Notificações de ativação'
        description={
          <span>
            Deseja enviar notificação para <strong>{name}</strong> recomendando que se ative na
            plataforma?
          </span>
        }
      />,
    )
  }

  const buttonArray = [
    canAddUser && (
      <CButton key={0} onClick={onHandleAddUser}>
        Adicionar usuário
      </CButton>
    ),
    canExportUsers && (
      <CButton key={1} onClick={handleExportUsers}>
        Exportar usuários
      </CButton>
    ),
    canImportByCsv && (
      <CButton key={2} onClick={handleSendNotification}>
        Enviar notificações
      </CButton>
    ),
  ].filter(Boolean)

  return (
    <UsersList
      currentOrg={currentOrg || 0}
      orgType={orgType}
      buttonArray={buttonArray as JSX.Element[]}
      handleDelete={handleDelete}
      handleNotifyUser={handleNotifyUser}
      handleSelect={handleSelect}
      onHandleEditUser={onHandleEditUser}
      selectedUsers={selectedUsers}
      setSelectedUsers={setSelectedUsers}
      queryParams={queryParams}
    />
  )
}

export default ActivatePage
