import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { Group, Title } from '@/v3/presentation/pages/health-unit/pages/view/components/Section'
import { GridItem, GridWrapper } from '@/components/Grid'
import { StyledDivider } from '@/v3/presentation/pages/health-unit/components/Form/NavigationButtons/styles'
import { EditSections } from '@/v3/presentation/pages/health-unit/components/Form/Steps'
import { CardContent } from '@/v3/presentation/components/Cards/CardContent'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { capitalizeName } from '@/utils/capitalizeName'
import {
  ListInstitutionsFilters,
  useFetchListInstitutions,
} from '@/v3/presentation/hooks/api/organizations'
import { limit } from '@/constants/api'
import { Brand, Institution, Network } from '@/v3/domain/organizations/Organization'
import { EditButton } from '@/v3/presentation/components/EditButton/EditButton'
import { formatURL } from '@/v3/utils/formatURL'
import { NEW_ROUTES } from '@/constants/routes'
import { OrganizationType } from '@/v3/presentation/pages/organizations/constants/organizationType'
import { CDisplayRecord } from '@/v3/presentation/newComponents'
import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'

import { LinkedInstitutionsFilter } from './components/FilterLink'

export const LinkTab = ({
  canEdit,
  canView,
  data,
  type,
}: {
  canEdit?: boolean
  canView?: boolean
  data: Institution | Network | Brand
  type?: 'institution' | 'brand' | 'network'
}) => {
  const router = useRouter()
  const [offset, setOffset] = useState<number>(0)
  const [pageCounter, setPageCounter] = useState(1)
  const [nameFilter, setNameFilter] = useState<string>('')
  let param: ListInstitutionsFilters = {
    limit,
    offset,
    searchName: nameFilter,
  }

  if (type === 'network') {
    param = { ...param, networkId: Number(data.id) }
  }

  if (type === 'brand') {
    param = { ...param, brandIds: [Number(data.id)] }
  }
  const { data: institutionsData } = useFetchListInstitutions(param)

  const formatBrands = (brands?: Brand[]) => {
    const brandsNames = brands?.map((brand) => capitalizeName(brand.fantasyName))

    const brandsFormat = brandsNames?.join(', ')

    return brandsFormat
  }

  const handleClick = (id: number, orgType: string, section: EditSections) => {
    const url = formatURL(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.EDIT.path, {
      pathParams: {
        id: String(id),
        type: orgType,
      },
      queryParams: {
        section,
      },
    })

    router.push(url)
  }

  return (
    <>
      {canView && (
        <Box p={2}>
          <Title
            content='Vínculos de marca'
            icon={
              canEdit && (
                <EditButton
                  onClick={() =>
                    handleClick(data.id, OrganizationType[data.costCenter], EditSections.LINK)
                  }
                />
              )
            }
          />
          {type === 'institution' && (
            <>
              <Group>
                <GridWrapper>
                  <GridItem xs={6} sm={3}>
                    <CDisplayRecord
                      value={(data as Institution)?.brand?.fantasyName || '-'}
                      label='Marca'
                      withDivider={false}
                    />
                  </GridItem>
                </GridWrapper>
              </Group>
              <StyledDivider />
              <Group>
                <GridWrapper>
                  <GridItem xs={6} sm={3}>
                    <CDisplayRecord
                      value={(data as Institution)?.brand?.network?.fantasyName || '-'}
                      label='Rede'
                      withDivider={false}
                    />
                  </GridItem>
                </GridWrapper>
              </Group>
              <StyledDivider />
            </>
          )}

          {type === 'brand' && (
            <>
              <Group>
                <GridWrapper>
                  <GridItem xs={6} sm={3}>
                    <CDisplayRecord
                      value={(data as Brand)?.network?.fantasyName || '-'}
                      label='Rede'
                      withDivider={false}
                    />
                  </GridItem>
                </GridWrapper>
              </Group>
              <StyledDivider />
              <Group>
                <Title content='Instituições vinculadas' />
                <Box width='100%' my={1}>
                  <LinkedInstitutionsFilter setNameFilter={setNameFilter} nameFilter={nameFilter} />
                </Box>

                <GridWrapper>
                  <GridItem xs={12} sm={12}>
                    {institutionsData?.results && institutionsData?.results.length > 0 && (
                      <>
                        {institutionsData?.results.map((institution) => {
                          return (
                            <CardContent
                              key={institution.id}
                              sx={{
                                px: 2,
                                py: 1,
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Typography variant='h5'>
                                {institution?.fantasyName
                                  ? capitalizeName(institution?.fantasyName)
                                  : 'Nome não cadastrado'}
                              </Typography>
                            </CardContent>
                          )
                        })}
                      </>
                    )}
                    {institutionsData?.results && institutionsData?.results.length < 1 && (
                      <Box px={2}>
                        <NotFound text='Nenhuma organização encontrada!' />
                      </Box>
                    )}
                  </GridItem>
                  {(institutionsData?.count && institutionsData?.count > limit) ||
                  institutionsData === undefined ? (
                    <CPagination
                      count={Math.ceil((institutionsData?.count || 0) / limit)}
                      defaultPage={pageCounter}
                      onChange={(e, page) => {
                        setPageCounter(page)

                        setOffset((page - 1) * limit)
                      }}
                      page={offset / limit + 1}
                      color='primary'
                      totalCount={institutionsData?.count}
                    />
                  ) : null}
                </GridWrapper>
              </Group>
            </>
          )}

          {type === 'network' && (
            <>
              <Group>
                <GridWrapper>
                  <GridItem xs={6} sm={3}>
                    <CDisplayRecord
                      withDivider={false}
                      value={formatBrands((data as Network)?.brand)}
                      label='Marca'
                    />
                  </GridItem>
                </GridWrapper>
              </Group>
              <StyledDivider />
              <Group>
                <Title content='Instituições vinculadas' />
                <Box width='100%' my={1}>
                  <LinkedInstitutionsFilter setNameFilter={setNameFilter} nameFilter={nameFilter} />
                </Box>
                <GridWrapper>
                  <GridItem xs={12} sm={12}>
                    {institutionsData?.results && institutionsData?.results.length > 0 && (
                      <>
                        {institutionsData?.results.map((institution) => {
                          return (
                            <CardContent
                              key={institution.id}
                              sx={{
                                px: 2,
                                py: 1,
                                mb: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <Typography variant='h5'>
                                {institution?.fantasyName
                                  ? capitalizeName(institution?.fantasyName)
                                  : 'Nome não cadastrado'}
                              </Typography>
                            </CardContent>
                          )
                        })}
                      </>
                    )}
                    {institutionsData?.results && institutionsData?.results.length < 1 && (
                      <Box px={2}>
                        <NotFound text='Nenhuma organização encontrada!' />
                      </Box>
                    )}
                  </GridItem>
                </GridWrapper>
              </Group>
            </>
          )}
        </Box>
      )}
    </>
  )
}

export default LinkTab
