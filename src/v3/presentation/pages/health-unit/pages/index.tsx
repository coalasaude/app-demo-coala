import React, { useState } from 'react'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'

import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'
import { AUTHENTICATED_ROUTES, NEW_ROUTES, ROUTES, subRoutes } from '@/constants/routes'
import { capitalizeName } from '@/utils/capitalizeName'
import { GridItem, GridWrapper } from '@/components/Grid'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { CardUnit } from '@/v3/presentation/components/CardUnit'
import { PageHeader } from '@/v3/presentation/newComponents'
import { CFilterHeaderTable } from '@/v3/presentation/components/Table'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'
import { useFetchBrowseHealthUnit } from '@/v3/presentation/hooks/api/@v2/health-units/health-unit/useFetchBrowseHealthUnit'
import useMediaQuery from '@/hooks/useMediaQuery'
import HealthUnitListTable from '@/v3/presentation/components/HealthUnitListTable/HealthUnitListTable'
import { TableBodySkeleton } from '@/components/Skeletons/TableBodySkeleton'
import { CardListSkeleton } from '@/components/Skeletons/CardListSkeleton'

import { HEALTH_UNIT_TYPE_DESCRIPTION } from '../constants'

import { HealthUnitListFilter } from './view/components/HealthUnitFilter'

export const HealthUnitList = () => {
  const limit = 12

  const router = useRouter()
  const queryParams = router.query as Record<string, any>
  const { replaceManyQueryParam } = useUrlQueryControl({})
  const isSmallDevice = useMediaQuery('sm')
  const { response, isLoading } = useFetchBrowseHealthUnit({
    limit,
    offset: queryParams.offset || 0,
    name: queryParams.name,
    neighborhood: queryParams.neighborhood,
    state: queryParams.state,
    city: queryParams.city,
    status: queryParams.status,
  })

  const [canListHealthUnit, canAddHealthUnit] = useHasPermission([
    Permissions.VIEW_HEALTH_UNIT,
    Permissions.MANAGE_HEALTH_UNIT,
  ])
  const [pageCounter, setPageCounter] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (id: number) => {
    router.push(NEW_ROUTES.AUTHENTICATED.HEALTH_UNIT.VIEW.path.replace('[id]', String(id)))
  }

  const handleEdit = (id: number) => {
    router.push(
      `${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.HEALTH_UNIT}/${id}/edit?section=administrative`,
    )
  }

  const onSetFilters = (filters: Record<string, any>) => {
    if (!filters.offset) filters.offset = 0
    replaceManyQueryParam(filters)
  }

  const removeChipFilter = (deleteChip: string) => {
    const newQueryParams = { ...queryParams }
    for (const [key, value] of Object.entries(newQueryParams)) {
      if (value === deleteChip) {
        newQueryParams[key] = null
      }
    }
    onSetFilters(newQueryParams)
  }

  const getChipsList = () => {
    const chipsList = []

    if (queryParams.city) {
      chipsList.push({ label: queryParams.city, value: queryParams.city })
    }
    if (queryParams.state) {
      chipsList.push({ label: queryParams.state, value: queryParams.state })
    }

    return chipsList
  }

  return (
    <>
      <PageHeader
        title='Unidades de saúde'
        onBack={() => router.push(`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.HELLO}`)}
      />
      <Box display='flex' alignItems='center' gap={2} width={['100%']}>
        <CFilterHeaderTable
          boxProps={{ width: '100%' }}
          placeholder='Unidades de saúde'
          inputValue={queryParams.name}
          onSearch={(value) => onSetFilters({ name: value })}
          filterAction={() => setIsOpen(true)}
          buttonLabel='Adicionar'
          chipsList={getChipsList()}
          {...(canAddHealthUnit && {
            buttonAction: () => {
              router.push(`${subRoutes.HEALTH_UNIT.REGISTER.path}`)
            },
          })}
          onChipDelete={removeChipFilter}
        />
        <Box>
          <HealthUnitListFilter
            filters={queryParams}
            setFilters={onSetFilters}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </Box>
      </Box>
      {isLoading ? isSmallDevice ? <CardListSkeleton /> : <TableBodySkeleton /> : null}
      {!!response?.data?.length &&
        !isLoading &&
        (!isSmallDevice ? (
          <HealthUnitListTable
            healthUnits={response?.data}
            canEdit={canAddHealthUnit}
            onClickRow={handleClick}
            handleEdit={handleEdit}
          />
        ) : (
          <GridWrapper>
            {response?.data?.map((healthUnit) => {
              return (
                <GridItem xs={12} sm={6} md={6} lg={4} key={healthUnit.id}>
                  <CardUnit
                    canView={canListHealthUnit}
                    handleClick={() => healthUnit.id && handleClick(healthUnit.id)}
                    handleEdit={() => healthUnit.id && handleEdit(healthUnit.id)}
                    title={capitalizeName(healthUnit.name || healthUnit.company.companyName)}
                    subtitle={HEALTH_UNIT_TYPE_DESCRIPTION[healthUnit.type]}
                    captionSubtitle={healthUnit.contact.email || 'Não cadastrado'}
                    captionTitle='E-mail'
                    status={healthUnit.status}
                    secondCaptionSubtitle={healthUnit.contact.phone || 'Não cadastrado'}
                    secondCaptionTitle='Telefone'
                  />
                </GridItem>
              )
            })}
          </GridWrapper>
        ))}

      {!isLoading && response?.data?.length === 0 && (
        <NotFound text='Nenhuma registro encontrado' />
      )}

      {response?.pagination && response?.pagination.total > limit && !isLoading && (
        <CPagination
          defaultPage={pageCounter}
          count={Math.ceil(response?.pagination.total / limit)}
          onChange={(e, page) => {
            setPageCounter(page)

            onSetFilters({ ...queryParams, offset: (page - 1) * limit })
          }}
          totalCount={response?.pagination.total}
        />
      )}
    </>
  )
}
export default HealthUnitList
