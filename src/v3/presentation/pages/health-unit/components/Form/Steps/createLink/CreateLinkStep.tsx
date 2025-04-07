import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import TrashIcon from '/public/assets/svg/TrashIcon.svg'

import { useParams } from '@/hooks/useParams'
import * as Form from '@/v3/presentation/pages/health-unit/components/Form'
import { CardContent } from '@/v3/presentation/components/Cards/CardContent'
import { capitalizeName } from '@/utils/capitalizeName'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { Card } from '@/v3/presentation/pages/health-unit/components/Form/Card'
import { CAutoComplete } from '@/components/Forms'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useFetchListInstitutions } from '@/v3/presentation/hooks/api/organizations'

import { NavigationButtons } from '../../NavigationButtons'
import { steps } from '../constants'

export type SelectedInstitutions = {
  value: number
  label: string
}

export const CreateLinkStep = () => {
  const { setValue } = useFormContext()
  const [searchName, setSearchName] = useState<string>('')
  const { data: institutionsData } = useFetchListInstitutions(
    {
      limit: 15,
      offset: 0,
      searchName: searchName,
    },
    { canListAll: true },
  )
  const [selectedInstitution, setSelectedInstitution] = useState<SelectedInstitutions[]>([])
  const { queryParam, setQueryParam } = useUrlQueryControl({ queryName: 'step' })
  const { setParams } = useParams()

  useEffect(() => {
    const institutionsIds = selectedInstitution.map((institution) => institution.value)
    setParams({
      institutionsIds,
    })
  }, [selectedInstitution, setParams])

  const handleLinkInstitution = (newValue: SelectedInstitutions) => {
    setTimeout(() => setValue('institutionsIds', ''), 100)
    setSearchName('')
    const findInstitution = selectedInstitution.find(
      (institution) => institution.value == newValue.value,
    )
    if (!findInstitution) {
      setSelectedInstitution([...selectedInstitution, newValue])
    }
  }

  const handleUnlinkInstitution = (id: number) => {
    const removeInstitution = selectedInstitution.filter((institution) => institution.value !== id)
    setSelectedInstitution(removeInstitution)
  }

  const clearInstitutionName = (institutionName: string) => {
    const findCnpj = institutionName?.indexOf('(')
    if (findCnpj) {
      const slicedName = institutionName.slice(0, findCnpj)
      return capitalizeName(slicedName)
    }
  }

  const handleBack = () => {
    setQueryParam(steps[queryParam].back || 'unit')
  }

  return (
    <Form.Container mt={2}>
      <Form.CardGroup>
        <Card noBorder title='Instituições vinculadas'>
          <CAutoComplete
            sx={{ flex: '1' }}
            name='institutionsIds'
            options={
              institutionsData?.results?.map((institution) => ({
                value: institution.id,
                label: institution.getFantasyNameWithCnpj(),
              })) || []
            }
            label='Buscar instituições'
            onChange={(e, newValue) => newValue && handleLinkInstitution(newValue)}
            removeMultipleChip
            onInputChange={(e, value, reason) => {
              if (reason === 'input') {
                setSearchName(value)
              }
            }}
          />
          <Box>
            {selectedInstitution && selectedInstitution?.length > 0 ? (
              selectedInstitution?.map((institution) => (
                <CardContent
                  key={institution.value}
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
                  <Typography variant='h5'>{clearInstitutionName(institution.label)}</Typography>

                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleUnlinkInstitution(institution.value)}
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
      <NavigationButtons
        back={{ onClick: handleBack }}
        next={{ type: 'submit', label: 'Finalizar' }}
      />
    </Form.Container>
  )
}
