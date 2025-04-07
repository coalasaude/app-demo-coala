import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

import TrashIcon from '/public/assets/svg/TrashIcon.svg'
import PlusIcon from '/public/assets/svg/PlusIcon.svg'

import { capitalizeName } from '@/utils/capitalizeName'
import { CardContent } from '@/v3/presentation/components/Cards/CardContent'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { limit } from '@/constants/api'
import { Title } from '@/v3/presentation/pages/health-unit/pages/view/components/Section'
import useMediaQuery from '@/hooks/useMediaQuery'
import { Permissions } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/useHasPermission'
import { useLayout } from '@/hooks/useLayout'
import apiRequest from '@/v3/infra/services/api'
import { NEW_ROUTES } from '@/constants/routes'
import { useFetchInstitutionHealthUnits } from '@/v3/presentation/hooks/api/healthUnit/useFetchInstitutionHealthUnits'
import { bindPathParams } from '@/utils/bindParams'
import HeaderButtonsPortal from '@/v3/presentation/components/PageHeader/HeaderButtonsPortal'
import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'
import { useFetchListHospitals } from '@/v3/presentation/hooks/api/organizations/institution/useFetchListHospitals'

import { HealthUnitModal } from '../../HealthUnitModal'

const HealthUnitsTab = () => {
  const router = useRouter()
  const { showSnackBar } = useLayout()
  const { institutionHealthUnitsData, refetch } = useFetchInstitutionHealthUnits(
    Number(router.query.id),
  )
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [healthUnitId, setHealthUnitId] = useState<number>()
  const isSmallDevice = useMediaQuery('sm')
  const [canAddHealthUnit] = useHasPermission([Permissions.MANAGE_HEALTH_UNIT])
  const institutionId = Number(router.query.id)
  const { data: listHospitals, setLimit, setOffset } = useFetchListHospitals({ institutionId })
  const totalCount = listHospitals?.count || 0

  const handleUnlinkInstitution = async ({
    healthUnitId,
    institutionId,
  }: {
    healthUnitId: number
    institutionId: number
  }) => {
    const request: any = await apiRequest({
      path: `health-units/${healthUnitId}/institutions/${institutionId}`,
      method: 'DELETE',
    })

    if (request.isError) {
      return showSnackBar({
        type: 'error',
        message: request.data.message || 'Algo deu errado!',
      })
    }

    showSnackBar({
      type: 'success',
      message: 'Vínculo removido',
    })
    refetch()
    setIsOpenModal(false)
  }

  const getHospitals = (limit: number, offset: number) => {
    setLimit(limit)
    setOffset(offset)
  }

  return (
    <Box px={2} pt={1.2} pb={2}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Title content='Unidades de saúde' />
        <HeaderButtonsPortal>
          {canAddHealthUnit && (
            <Button
              variant='contained'
              size='small'
              fullWidth={isSmallDevice}
              onClick={() =>
                router.push(
                  bindPathParams(
                    `${NEW_ROUTES.AUTHENTICATED.ORGANIZATION.INSTITUTION.path}${NEW_ROUTES.AUTHENTICATED.ORGANIZATION.INSTITUTION.LINK.path}`,
                    {
                      id: router.query.id,
                    },
                  ),
                )
              }
            >
              <Box mr={1}>
                <PlusIcon size='large' />
              </Box>
              Adicionar unidade
            </Button>
          )}
        </HeaderButtonsPortal>
      </Box>

      <Box mt={1} p={2}>
        {institutionHealthUnitsData && institutionHealthUnitsData?.length > 0 ? (
          <>
            {institutionHealthUnitsData?.map((healthUnit: any) => {
              return (
                <CardContent
                  key={healthUnit.id}
                  sx={{
                    px: 2,
                    py: 1,
                    mb: 1,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}
                  onClick={() =>
                    router.push(`${NEW_ROUTES.AUTHENTICATED.HEALTH_UNIT.path}/${healthUnit.id}`)
                  }
                >
                  <Typography variant='h5'>
                    {healthUnit?.company?.name
                      ? capitalizeName(healthUnit?.company?.name)
                      : 'Nome não cadastrado'}
                  </Typography>
                  {canAddHealthUnit && (
                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsOpenModal(!isOpenModal)
                        setHealthUnitId(healthUnit.id)
                      }}
                    >
                      <TrashIcon />
                    </Box>
                  )}
                </CardContent>
              )
            })}
            <HealthUnitModal
              open={isOpenModal}
              handleClose={() => setIsOpenModal(false)}
              handleConfirm={() => {
                if (healthUnitId) {
                  handleUnlinkInstitution({
                    healthUnitId: healthUnitId,
                    institutionId: Number(router.query.id),
                  })
                }
              }}
            />
          </>
        ) : (
          <NotFound text='Nenhuma unidade de saúde encontrada!' />
        )}
        {institutionHealthUnitsData && institutionHealthUnitsData?.length > limit && (
          <CPagination
            count={Math.ceil(totalCount / limit)}
            onChange={(e, page) => {
              getHospitals(limit, limit * (page - 1))
            }}
            color='primary'
            totalCount={totalCount}
          />
        )}
      </Box>
    </Box>
  )
}

export default HealthUnitsTab
