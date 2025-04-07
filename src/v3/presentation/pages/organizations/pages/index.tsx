import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'

import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import { AUTHENTICATED_ROUTES, NEW_ROUTES, ROUTES } from '@/constants/routes'
import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'
import { GridItem, GridWrapper } from '@/components/Grid'
import { cnpjNormalizer } from '@/components/Forms/normalizers/cnpjNormalizer'
import { NotFound } from '@/v3/presentation/components/NotFound'
import {
  ListOrganizationsFilters,
  useFetchListOrganizations,
} from '@/v3/presentation/hooks/api/organizations/useFetchListOrganizations'
import useMediaQuery from '@/hooks/useMediaQuery'
import {
  CostCenter,
  InstitutionStatus,
  Organization,
  InstitutionViolationType,
} from '@/v3/domain/organizations/Organization'
import { ORGANIZATION_TYPE_DESCRIPTION } from '@/v3/presentation/pages/organizations/constants/organizationType'
import { CardUnit } from '@/v3/presentation/components/CardUnit'
import { PageHeader } from '@/v3/presentation/newComponents'
import { CFilterHeaderTable } from '@/v3/presentation/components/Table'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'
import OrganizationListTable from '@/v3/presentation/components/OrganizationListTable/OrganizationList'
import { TableBodySkeleton } from '@/components/Skeletons/TableBodySkeleton'
import { CardListSkeleton } from '@/components/Skeletons/CardListSkeleton'

import { DrawerFilterOrganizations } from './view/components/DrawerFilterOrganizations'

export const typeOrganizationDescription = {
  [CostCenter.INSTITUTION]: 'Instituições',
  [CostCenter.BRAND]: 'Marcas',
  [CostCenter.NETWORK]: 'Redes',
}

export const statusOrganizationDescription = {
  [InstitutionStatus.ACTIVE]: 'Ativo',
  [InstitutionStatus.INACTIVE]: 'Inativo',
  [InstitutionStatus.TRIAL]: 'Trial',
}

export const institutionViolationDescription = {
  [InstitutionViolationType.ALL]: 'Todos',
  [InstitutionViolationType.INFRINGEMENT]: 'Inadimplentes',
  [InstitutionViolationType.LATE_PAYMENT]: 'Atrasados',
}

export const OrganizationList = () => {
  const limit = 12
  const router = useRouter()
  const queryParams = router.query as ListOrganizationsFilters
  const { replaceManyQueryParam } = useUrlQueryControl({})

  const isSmallDevice = useMediaQuery('sm')
  const { data, isLoading, offset, setOffset } = useFetchListOrganizations({
    ...queryParams,
    limit,
  })
  const [canManage, canView] = useHasPermission([
    Permissions.MANAGE_ORGANIZATION,
    Permissions.VIEW_ORGANIZATIONS,
  ])

  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)

  const handleClick = (id: number, type: CostCenter) => {
    if (type === CostCenter.INSTITUTION) {
      router.push(
        NEW_ROUTES.AUTHENTICATED.ORGANIZATION.INSTITUTION.path.replace('[id]', String(id)),
      )
    }
    if (type === CostCenter.NETWORK) {
      router.push(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.NETWORK.path.replace('[id]', String(id)))
    }
    if (type === CostCenter.BRAND) {
      router.push(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.BRAND.path.replace('[id]', String(id)))
    }
  }

  const onSetFilters = (filters: ListOrganizationsFilters) => {
    if (!filters.offset) filters.offset = 0
    replaceManyQueryParam(filters)
  }

  const removeChipFilter = (deleteChip: string) => {
    const newQueryParams = { ...queryParams }
    for (const [key, value] of Object.entries(newQueryParams)) {
      if (value === deleteChip) {
        newQueryParams[key as keyof ListOrganizationsFilters] = undefined
      }
    }
    onSetFilters(newQueryParams)
  }

  const getChipsList = () => {
    const chipsList = []

    if (queryParams.type) {
      chipsList.push({
        label: typeOrganizationDescription[queryParams.type],
        value: queryParams.type,
      })
    }
    if (queryParams.status) {
      chipsList.push({
        label: statusOrganizationDescription[queryParams.status],
        value: queryParams.status,
      })
    }

    if (queryParams.violation) {
      chipsList.push({
        label: institutionViolationDescription[queryParams.violation],
        value: queryParams.violation,
      })
    }

    return chipsList
  }

  useEffect(() => {
    if (router.asPath === NEW_ROUTES.AUTHENTICATED.ORGANIZATION.path) {
      onSetFilters({
        type: CostCenter.INSTITUTION,
        status: InstitutionStatus.ACTIVE,
        violation: InstitutionViolationType.ALL,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PageHeader
        title='Organizações'
        onBack={() => router.push(`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.HELLO}`)}
      />
      <Box width={['100%']}>
        <CFilterHeaderTable
          placeholder='Organizações'
          onSearch={(value) => onSetFilters({ searchName: value })}
          inputValue={queryParams.searchName || ''}
          filterAction={() => setIsOpenFilter(true)}
          buttonLabel='Adicionar'
          chipsList={getChipsList()}
          {...(canManage && {
            buttonAction: () => {
              router.push(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.ADD.path)
            },
          })}
          onChipDelete={removeChipFilter}
        />
      </Box>
      {isLoading ? isSmallDevice ? <CardListSkeleton /> : <TableBodySkeleton /> : null}
      {data &&
        data?.results?.length > 0 &&
        !isLoading &&
        (!isSmallDevice ? (
          <OrganizationListTable organizations={data?.results} onClickRow={handleClick} />
        ) : (
          <GridWrapper>
            {data?.results?.map((organization: Organization) => {
              return (
                <GridItem xs={12} sm={6} md={6} lg={4} key={organization.id}>
                  <CardUnit
                    canView={canView}
                    handleClick={() => handleClick(organization.id, organization.costCenter)}
                    title={organization.fantasyName}
                    imageUrl={organization?.image?.url}
                    subtitle={
                      ORGANIZATION_TYPE_DESCRIPTION[queryParams.type || CostCenter.INSTITUTION]
                    }
                    captionSubtitle={cnpjNormalizer(organization.cnpj) || 'Não cadastrado'}
                    captionTitle='CNPJ'
                    status={organization.status ? organization.status : ''}
                    secondCaptionSubtitle={
                      formatPhoneNumber(organization.telephone) || 'Não cadastrado'
                    }
                    secondCaptionTitle='Telefone'
                    hasAvatar
                  />
                </GridItem>
              )
            })}
          </GridWrapper>
        ))}

      {!isLoading && data?.results?.length === 0 && <NotFound text='Nenhuma registro encontrado' />}

      {(data?.count && data?.count > limit && !isLoading) || (data === undefined && !isLoading) ? (
        <CPagination
          count={Math.ceil(data?.count / limit)}
          onChange={(e, page) => {
            setOffset(limit * (page - 1))
          }}
          page={offset / limit + 1}
          color='primary'
          siblingCount={isSmallDevice ? 0 : 1}
          totalCount={data?.count}
        />
      ) : null}

      <DrawerFilterOrganizations
        filters={queryParams}
        isOpenFilter={isOpenFilter}
        setIsOpenFilter={setIsOpenFilter}
        onSetFilters={onSetFilters}
      />
    </>
  )
}

export default OrganizationList
