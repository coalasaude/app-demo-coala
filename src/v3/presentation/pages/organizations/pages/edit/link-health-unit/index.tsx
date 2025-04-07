import { useMemo, useState } from 'react'
import { throttle } from 'lodash'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import TrashIcon from '/public/assets/svg/TrashIcon.svg'

import { CardContent } from '@/v3/presentation/components/Cards/CardContent'
import { capitalizeName } from '@/utils/capitalizeName'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { Card } from '@/v3/presentation/pages/health-unit/components/Form/Card'
import apiRequest from '@/v3/infra/services/api'
import { useLayout } from '@/hooks/useLayout'
import { useFetchInstitutionHealthUnits } from '@/v3/presentation/hooks/api/healthUnit/useFetchInstitutionHealthUnits'
import { SelectedInstitutions } from '@/v3/presentation/pages/health-unit/components/Form/Steps'
import { HealthUnit, ListHealthUnit } from '@/types/healthUnit'
import { useFetchListHealthUnit } from '@/v3/presentation/hooks/api/healthUnit/useFetchListHealthUnit'
import Paper from '@/v3/presentation/components/Paper'
import { DefaultStatus } from '@/types/status'
import { cnpjNormalizer } from '@/components/Forms/normalizers/cnpjNormalizer'
import { useFetchInstitution } from '@/v3/presentation/hooks/useFetchInstitution'
import { SearchFilterInput } from '@/v3/presentation/pages/health-unit/pages/view/components/SearchFilter'
import { PageHeader } from '@/v3/presentation/newComponents'

export const LinkHealthUnit = () => {
  const router = useRouter()
  const { id } = router.query
  const { showSnackBar } = useLayout()
  const { institutionHealthUnitsData, refetch: institutionHealthUnitsRefetch } =
    useFetchInstitutionHealthUnits(Number(router.query.id))
  const [institutionFilter, setInstitutionFilter] = useState<string>()
  const { healthUnitListData } = useFetchListHealthUnit({
    status: DefaultStatus.ACTIVE,
    name: institutionFilter,
  })
  const { data: institutionData } = useFetchInstitution(Number(id))

  const doInstitutionFilter = useMemo(
    () => throttle((value) => setInstitutionFilter(value), 1000),
    [setInstitutionFilter],
  )

  const handleLinkHealthUnit = async (healthUnitId: number) => {
    const request: any = await apiRequest({
      path: `health-units/${healthUnitId}/institutions/${id}`,
      method: 'POST',
    })

    if (request.isError) {
      return showSnackBar({
        type: 'error',
        message: request.data.message || 'Algo deu errado!',
      })
    }

    showSnackBar({
      type: 'success',
      message: 'Vínculo criado',
    })

    institutionHealthUnitsRefetch()
  }

  const handleUnlinkHealthUnit = async (institutionId: number) => {
    const request: any = await apiRequest({
      path: `health-units/${institutionId}/institutions/${id}`,
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

    institutionHealthUnitsRefetch()
  }

  return (
    <>
      <PageHeader title={institutionData?.fantasyName || 'Instituição'} />
      <Paper py={3} px={2}>
        <Card title='Unidades de saúde vinculadas'>
          <Box>
            <SearchFilterInput
              sx={{ flex: '1' }}
              placeholder='Unidades de saúde'
              name='healthUnit'
              options={
                healthUnitListData?.data?.map((healthUnit: ListHealthUnit) => ({
                  value: healthUnit.id,
                  label: healthUnit?.name
                    ? `${capitalizeName(healthUnit.name)} (${
                        cnpjNormalizer(healthUnit.cnpj) || 'CNPJ não cadastrado'
                      })`
                    : 'Nome não cadastrado',
                })) || []
              }
              isOptionEqualToValue={(option: SelectedInstitutions, value) =>
                option.value === value.value
              }
              onInputChange={(e, value, reason) => {
                if (reason === 'input') {
                  doInstitutionFilter(value)
                }
              }}
              handleLinkInstitution={handleLinkHealthUnit}
            />
          </Box>

          <Box>
            {institutionHealthUnitsData && institutionHealthUnitsData?.length > 0 ? (
              institutionHealthUnitsData?.map((healthUnit: HealthUnit) => (
                <CardContent
                  key={healthUnit.id}
                  sx={{
                    px: 2,
                    py: 1,
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Typography variant='h5'>
                    {healthUnit.company.name
                      ? capitalizeName(healthUnit.company.name)
                      : healthUnit.company.companyName
                        ? capitalizeName(healthUnit.company.companyName)
                        : 'Nome não cadastrado'}
                  </Typography>

                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (healthUnit.id) {
                        handleUnlinkHealthUnit(healthUnit.id)
                      }
                    }}
                  >
                    <TrashIcon />
                  </Box>
                </CardContent>
              ))
            ) : (
              <NotFound text='Nenhuma instituição vinculada' />
            )}
          </Box>
        </Card>
      </Paper>
    </>
  )
}

export default LinkHealthUnit
