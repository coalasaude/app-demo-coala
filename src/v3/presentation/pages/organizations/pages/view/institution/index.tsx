import React from 'react'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'

import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { NotFound } from '@/components/NotFound'
import { useFetchInstitution } from '@/v3/presentation/hooks/api/organizations/institution/useFetchInsitution'
import { useMutateEditInstitution } from '@/v3/presentation/hooks/api/organizations/institution/useMutateEditInstitution'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { OrgInfoHeader } from '../components/OrganizationHeader'
import { OrganizationType } from '../../../constants/organizationType'
import { getDefaultValues } from '../../../utils/getDefaultValues'

import PageHeaderInstitution from './components/PageHeaderInstitution'
import InstitutionTabs from './components/InstitutionsTabs'

export const InstitutionView = () => {
  const router = useRouter()
  const {
    data,
    isLoading,
    canEditOwnOrganization,
    canExportUsers,
    canImportByCsv,
    canUpdateInstitution,
    canView,
  } = useFetchInstitution(Number(router.query.id))
  const { mutateAsync: mutateEditInstitution } = useMutateEditInstitution()
  const queryClient = useQueryClient()

  const handleEdit = (file?: File) => {
    if (!data) return
    mutateEditInstitution({
      id: Number(router.query.id),
      payload: {
        ...getDefaultValues(data, OrganizationType.INSTITUTION),
        logo: file,
        removeImage: !file,
      } as any,
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeyEnum.COST_CENTER_INSTITUTION, Number(router.query.id)],
      })
    })
  }

  if (!data && isLoading) {
    return <ViewSkeleton />
  }

  if (!data && !isLoading) {
    return <NotFound text='Organização não encontrada.' />
  }

  return (
    <>
      <PageHeaderInstitution />
      <Box>
        <OrgInfoHeader
          fantasyName={data?.fantasyName}
          cnpj={data?.cnpj}
          status={data?.status}
          telephone={data?.telephone}
          imageUrl={data?.image?.url}
          onImageChange={handleEdit}
          type='Instituição'
        />
      </Box>
      <Box>
        <InstitutionTabs
          canEditOwnOrganization={canEditOwnOrganization}
          canExportUsers={canExportUsers}
          canImportByCsv={canImportByCsv}
          canUpdateInstitution={canUpdateInstitution}
          canView={canView}
          data={data!}
        />
      </Box>
    </>
  )
}

export default InstitutionView
