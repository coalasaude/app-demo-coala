import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/router'

import TrashIcon from '/public/assets/svg/TrashIcon.svg'

import { useLayout } from '@/hooks/useLayout'
import { CardContent } from '@/v3/presentation/components/Cards/CardContent'
import { NotFound } from '@/v3/presentation/components/NotFound'
import * as Section from '@/v3/presentation/pages/health-unit/pages/view/components/Section'
import useMediaQuery from '@/hooks/useMediaQuery'
import { AUTHENTICATED_ROUTES, NEW_ROUTES, ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { CButton } from '@/v3/presentation/newComponents'
import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'
import { HealthUnitModel } from '@/v3/domain/@v2/health-units/health-unit/health-unit.model'
import { useFetchBrowseInstitutions } from '@/v3/presentation/hooks/api/@v2/health-units/institution/useFetchBrowseInstitutions'
import { CFilterHeaderTable } from '@/v3/presentation/components/Table'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useMutateUnlinkInstitution } from '@/v3/presentation/hooks/api/@v2/health-units/institution/useMutateUnlinkInstitution'

import { HealthUnitInstitutionListFilter } from '../InstitutionFilter'

type Props = {
  canEdit?: boolean
  data?: HealthUnitModel
}

export const LinkedInstitutions = ({ data, canEdit }: Props) => {
  const limit = 15
  const router = useRouter()
  const isSmallDevice = useMediaQuery('sm')
  const { showSnackBar } = useLayout()
  const [isOpen, setIsOpen] = useState(false)

  const queryParams = router.query as Record<string, any>
  const { replaceManyQueryParam } = useUrlQueryControl({})

  const { mutateAsync: mutateUnlink } = useMutateUnlinkInstitution()

  const { response } = useFetchBrowseInstitutions({
    healthUnitId: data?.id,
    limit,
    offset: queryParams.offset,
    name: queryParams.name,
    neighborhood: queryParams.neighborhood,
  })

  const handleUnlinkInstitution = async (healthUnitId: number, institutionId: number) => {
    mutateUnlink({ healthUnitId: Number(healthUnitId), institutionId })
      .then(() => {
        showSnackBar({ type: 'success', message: 'Instituição desvinculada com sucesso' })
      })
      .catch(() => {
        showSnackBar({ type: 'error', message: 'Não foi possível desvincular a instituição' })
      })
  }

  const handleClickCard = (id: number) => {
    router.push(bindPathParams(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.INSTITUTION.path, { id }))
  }

  const removeChipFilter = (deleteChip: string) => {
    const newQueryParams = { ...queryParams }
    for (const [key, value] of Object.entries(newQueryParams)) {
      if (value === deleteChip) {
        newQueryParams[key] = ''
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

  const onSetFilters = (filters: Record<string, any>) => {
    if (!filters.offset) filters.offset = 0
    replaceManyQueryParam(filters)
  }

  return (
    <Section.Container p={2}>
      <Box display='flex' alignItems='center' gap={2} mt={3} justifyContent='space-between'>
        <Box display='flex' alignItems='center' flex='1' gap={1}>
          <CFilterHeaderTable
            boxProps={{ width: '100%' }}
            placeholder='Unidades de saúde'
            inputValue={queryParams.name}
            onSearch={(value) => onSetFilters({ name: value })}
            filterAction={() => setIsOpen(true)}
            buttonLabel='Adicionar'
            chipsList={getChipsList()}
            onChipDelete={removeChipFilter}
          />
          <HealthUnitInstitutionListFilter
            filters={queryParams}
            setFilters={onSetFilters}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </Box>
        {!isSmallDevice && (
          <Box>
            <CButton
              variant='primary'
              onClick={() => {
                router.push(
                  `${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.HEALTH_UNIT}/${data?.id}/edit?section=institutions`,
                )
              }}
            >
              Adicionar instituição
            </CButton>
          </Box>
        )}
      </Box>
      <Box mt={3}>
        {response?.data?.length ? (
          response?.data?.map((institution) => (
            <CardContent
              key={institution.id}
              sx={{
                px: 2,
                py: 1,
                mb: 2,
                display: 'flex',
                cursor: 'pointer',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onClick={() => handleClickCard(institution.id)}
            >
              <Typography variant='h5'>{institution.name}</Typography>
              {canEdit && (
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    data?.id && handleUnlinkInstitution(data.id, institution.id)
                  }}
                >
                  <TrashIcon />
                </Box>
              )}
            </CardContent>
          ))
        ) : (
          <NotFound text='Nenhuma instituição encontrada' />
        )}

        {response?.pagination?.total && response?.pagination?.total > 15 ? (
          <CPagination
            count={Math.ceil(response?.pagination?.total / limit)}
            onChange={(e, page) => {
              replaceManyQueryParam({
                limit,
                offset: page * limit,
                total: response?.pagination?.total,
              })
            }}
            totalCount={response?.pagination?.total}
          />
        ) : null}
      </Box>
    </Section.Container>
  )
}
