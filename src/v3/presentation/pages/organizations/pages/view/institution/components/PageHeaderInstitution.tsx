import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { Permissions } from '@/constants/permissions'
import { DefaultStatus } from '@/types/status'
import { Modal } from '@/v3/presentation/pages/health-unit/pages/view/components/Modal'
import { useMutateToggleInstitutionStatus } from '@/v3/presentation/hooks/api/organizations/institution/useMutateToggleInstitutionStatus'
import { PageHeader } from '@/v3/presentation/newComponents'
import { NEW_ROUTES } from '@/constants/routes'
import { useHasPermission } from '@/hooks/useHasPermission'

export const PageHeaderInstitution = () => {
  const router = useRouter()
  const [status, setStatus] = useState<DefaultStatus>()
  const [isOpen, setIsOpen] = useState(false)
  const { mutateAsync: toggleInstitutionStatusMutate } = useMutateToggleInstitutionStatus()
  const institutionId = Number(router.query.id)
  const [canUpdateInstitution, canEditOwnOrganization] = useHasPermission([
    Permissions.MANAGE_ORGANIZATION,
    Permissions.EDIT_OWN_ORGANIZATION,
  ])

  const handleStatusChange = (newStatus: DefaultStatus) => {
    setStatus(newStatus)

    toggleInstitutionStatusMutate({
      institutionId,
    })
  }

  const handleSwitchChange = () => {
    if (status === DefaultStatus.INACTIVE) {
      handleStatusChange(DefaultStatus.ACTIVE)
      return
    }

    setIsOpen(true)
  }

  const handleModalClose = () => {
    setIsOpen(false)
  }

  const handleModalConfirm = () => {
    setIsOpen(false)
    handleStatusChange(DefaultStatus.INACTIVE)
  }

  return (
    <>
      <PageHeader
        title='Organizações'
        onBack={() => router.push(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.path)}
        {...((canEditOwnOrganization || canUpdateInstitution) && {
          secondaryButtonProps: {
            variant: status === DefaultStatus.INACTIVE ? 'contained' : 'outlined',
            children: status === DefaultStatus.INACTIVE ? 'Ativar' : 'Inativar',
            onClick: handleSwitchChange,
            notUsePortal: true,
          },
        })}
      />
      <Modal
        title='Deseja inativar essa organização?'
        subtitle='Esta ação removerá todos os vínculos dessa organização'
        open={isOpen}
        handleConfirm={handleModalConfirm}
        handleClose={handleModalClose}
      />
    </>
  )
}

export default PageHeaderInstitution
