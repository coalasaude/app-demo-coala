import { useEffect, useMemo, useState } from 'react'
import { throttle } from 'lodash'
import { Box, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import TrashIcon from '/public/assets/svg/TrashIcon.svg'

import * as Form from '@/v3/presentation/pages/health-unit/components/Form'
import { useFetchInstitutions } from '@/v3/presentation/hooks/useFetchInstitutions'
import { CardContent } from '@/v3/presentation/components/Cards/CardContent'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { Card } from '@/v3/presentation/pages/health-unit/components/Form/Card'
import { CAutoComplete } from '@/components/Forms'
import { useLayout } from '@/hooks/useLayout'
import { useFetchBrowseInstitutions } from '@/v3/presentation/hooks/api/@v2/health-units/institution/useFetchBrowseInstitutions'
import { useMutateLinkInstitution } from '@/v3/presentation/hooks/api/@v2/health-units/institution/useMutateLinkInstitution'
import { useMutateUnlinkInstitution } from '@/v3/presentation/hooks/api/@v2/health-units/institution/useMutateUnlinkInstitution'

import { SelectedInstitutions } from '../createLink'

export const LinkStep = () => {
  const router = useRouter()
  const { id } = router.query
  const { showSnackBar } = useLayout()
  const { apiRequest: apiRequestInstitutions, data: institutionsData } = useFetchInstitutions()
  const [institutionFilter, setInstitutionFilter] = useState<string>()
  const { response: healthUnitInstitutions } = useFetchBrowseInstitutions({
    healthUnitId: Number(id),
  })

  const { mutateAsync: mutateLink } = useMutateLinkInstitution()
  const { mutateAsync: mutateUnlink } = useMutateUnlinkInstitution()

  useEffect(() => {
    if (institutionFilter) {
      apiRequestInstitutions({ search_name: institutionFilter })
      return
    }
    apiRequestInstitutions()
  }, [apiRequestInstitutions, institutionFilter])

  const doInstitutionFilter = useMemo(
    () => throttle((value) => setInstitutionFilter(value), 1500),
    [setInstitutionFilter],
  )

  const handleLinkInstitution = async (newValue: SelectedInstitutions) => {
    mutateLink({ healthUnitId: Number(id), institutionId: newValue.value })
      .then(() => {
        showSnackBar({ type: 'success', message: 'Instituição vinculada com sucesso' })
      })
      .catch(() => {
        showSnackBar({ type: 'error', message: 'Não foi possível vincular a instituição' })
      })
  }

  const handleUnlinkInstitution = async (institutionId: number) => {
    mutateUnlink({ healthUnitId: Number(id), institutionId })
      .then(() => {
        showSnackBar({ type: 'success', message: 'Instituição desvinculada com sucesso' })
      })
      .catch(() => {
        showSnackBar({ type: 'error', message: 'Não foi possível desvincular a instituição' })
      })
  }

  return (
    <Form.Container>
      <Paper>
        <Form.CardGroup>
          <Card title='Instituições vinculadas'>
            <CAutoComplete
              sx={{ flex: '1' }}
              name='institutionsIds'
              options={
                institutionsData?.map((institution) => ({
                  value: institution.id,
                  label: institution.getFantasyNameWithCnpj(),
                })) || []
              }
              label='Buscar instituições'
              onInputChange={(e, value, reason) => {
                if (reason === 'input') {
                  doInstitutionFilter(value)
                }
              }}
              onChange={(e, newValue) => newValue && handleLinkInstitution(newValue)}
            />
            <Box>
              {healthUnitInstitutions?.data?.length ? (
                healthUnitInstitutions?.data?.map((institution) => (
                  <CardContent
                    key={institution.id}
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
                    <Typography variant='h5'>{institution.name}</Typography>

                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleUnlinkInstitution(institution.id)}
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
        </Form.CardGroup>
      </Paper>
    </Form.Container>
  )
}
