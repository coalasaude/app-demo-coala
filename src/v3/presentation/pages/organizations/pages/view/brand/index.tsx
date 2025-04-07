import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'

import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'
import { NotFound } from '@/components/NotFound'
import { DefaultStatus } from '@/types/status'
import { useLayout } from '@/hooks/useLayout'
import { Modal } from '@/v3/presentation/pages/health-unit/pages/view/components/Modal'
import CTabs from '@/v3/presentation/components/TabsContainer'
import { useFetchBrand } from '@/v3/presentation/hooks/api/organizations/brand/useFetchBrand'
import { CostCenter } from '@/v3/domain/organizations/Organization'
import { useMutateToggleBrandStatus } from '@/v3/presentation/hooks/api/organizations/brand/useMutateToggleBrandStatus'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useMutateEditBrand } from '@/v3/presentation/hooks/api/organizations/brand/useMutateEditBrand'
import { PageHeader } from '@/v3/presentation/newComponents'
import { NEW_ROUTES } from '@/constants/routes'
import Paper from '@/v3/presentation/components/Paper'

import { OrgInfoHeader } from '../components/OrganizationHeader'
import UnitPanel from '../components/UnitPanel'
import InstitutionDataTab from '../components/InstitutionTabPages/InstitutionData'
import InstitutionUsers from '../components/InstitutionTabPages/InstitutionUsers'
import LinkTab from '../components/InstitutionTabPages/Link'
import { getDefaultValues } from '../../../utils/getDefaultValues'
import { OrganizationType } from '../../../constants/organizationType'
import { ReportsTab } from '../components/InstitutionTabPages/Reports/ReportsTab'

export const BrandView = () => {
  const router = useRouter()
  const { showSnackBar } = useLayout()

  const { toggleBrandStatusMudate } = useMutateToggleBrandStatus(Number(router.query.id))

  const { data, isLoading } = useFetchBrand(Number(router.query.id))
  const [status, setStatus] = useState<DefaultStatus>()
  const [isOpen, setIsOpen] = useState(false)
  const [canView, canImportByCsv, canUpdateInstitution, canEditOwnOrganization, canExportUsers] =
    useHasPermission([
      Permissions.VIEW_ORGANIZATIONS,
      Permissions.ADD_USERS_BY_BATCH,
      Permissions.MANAGE_ORGANIZATION,
      Permissions.EDIT_OWN_ORGANIZATION,
      Permissions.EXPORT_USERS,
    ])

  const { mutateAsync } = useMutateEditBrand()
  const queryClient = useQueryClient()

  const handleEdit = (file?: File) => {
    if (!data) return

    mutateAsync({
      id: Number(router.query.id),
      payload: {
        ...getDefaultValues(data, OrganizationType.BRAND),
        logo: file,
        removeImage: !file,
      } as any,
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeyEnum.COST_CENTER_BRAND, Number(router.query.id)],
      })
    })
  }

  const handleStatusChange = (newStatus: DefaultStatus) => {
    setStatus(newStatus)

    const message =
      newStatus === DefaultStatus.ACTIVE
        ? 'A organização foi ativada!'
        : 'A organização foi desativada!'

    toggleBrandStatusMudate().then(() => {
      showSnackBar({
        type: 'success',
        message,
      })
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

  useEffect(() => {
    setStatus(data?.status)
  }, [data?.status])

  if (!data && isLoading) {
    return <ViewSkeleton />
  }

  if (!data && !isLoading) {
    return <NotFound text='Organização não encontrada.' />
  }
  if (data) {
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
        <Box p={1}>
          <OrgInfoHeader
            fantasyName={data?.fantasyName}
            cnpj={data?.cnpj}
            status={data?.status}
            telephone={data?.telephone}
            imageUrl={data?.image?.url}
            onImageChange={handleEdit}
            type='Marca'
          />
        </Box>
        <Paper p={1}>
          <CTabs
            tabsNames={[
              'Painel de dados',
              'Dados cadastrais',
              'Usuários',
              'Vínculos',
              'Relatórios',
            ]}
            tabsBody={[
              <UnitPanel type='brand' key={0} />,
              <InstitutionDataTab
                canUpdateInstitution={canUpdateInstitution}
                data={data}
                key={1}
              />,
              <InstitutionUsers
                canImportByCsv={canImportByCsv}
                canExportUsers={canExportUsers}
                currentOrg={data.id}
                orgType={CostCenter.BRAND}
                key={2}
              />,
              <LinkTab
                type='brand'
                canView={canView}
                canEdit={canUpdateInstitution || canEditOwnOrganization}
                data={data}
                key={3}
              />,
              <ReportsTab type='brand' data={data} key={4} />,
            ]}
          />
        </Paper>
      </>
    )
  }
}

export default BrandView
