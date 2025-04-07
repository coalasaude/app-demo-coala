import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { CSelectControlled } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import {
  CCheckBoxControlled,
  CInputControlled,
  CTextAreaControlled,
} from '@/v3/presentation/newComponents'
import CChip from '@/v3/presentation/newComponents/atoms/CChip'
import { IAlergyFromProps } from '@/v3/presentation/pages/health-history/components/FormAllergy/types'
import { useFetchBrowseAllergy } from '@/v3/presentation/hooks/api/@v2/health-history/allergies/useFetchBrowseAllergy'

export function FormAllergy<T, R>({
  prefixName = '',
  categoryOptions,
  symptomOptions,
  id,
}: IAlergyFromProps<T, R>) {
  const { watch } = useFormContext()
  const [categoryValue, deniesAllergies] = watch([
    prefixName + 'categoryId',
    prefixName + 'deniesAllergies',
  ])
  const { allergies } = useFetchBrowseAllergy({ userId: id })
  const hasAllergies = !!allergies?.data?.length
  const categoryIdMatch = categoryOptions.find(({ value }) => value === categoryValue)?.label
  const otherCategory = categoryIdMatch === 'Outros'

  return (
    <Box>
      <GridWrapper>
        <GridItem xs={12}>
          <CSelectControlled
            name={prefixName + 'categoryId'}
            label='Categoria*'
            rules={{ required: true }}
            options={categoryOptions}
            disabledNullOption
            disabled={deniesAllergies}
          />
        </GridItem>

        {otherCategory && (
          <GridItem xs={12}>
            <CInputControlled
              name={prefixName + 'otherCategory'}
              placeholder='Descreva a categoria da alergia'
              label='Descreva a categoria da alergia'
              fullWidth
            />
          </GridItem>
        )}

        <GridItem xs={12}>
          <CInputControlled
            name={prefixName + 'causerAgent'}
            placeholder='O que causa a alergia?*ex. Abelhas, poeira, etc.'
            label='Agente causador*'
            fullWidth
            rules={{ required: true }}
            disabled={deniesAllergies}
          />
        </GridItem>
        <GridItem xs={12}>
          <CSelectControlled
            name={prefixName + 'symptom'}
            label='Sintomas*'
            placeholder='Sintomas* coceira, febre, etc.'
            fullWidth
            disabledNullOption
            multiple
            renderValue={(selected: any) => {
              const filteredValues = symptomOptions.filter(({ value: optValue }) =>
                selected.includes(optValue),
              )
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {filteredValues.map(({ label }) => (
                    <CChip size='small' label={label} variant='outlined' key={label} />
                  ))}
                </Box>
              )
            }}
            options={symptomOptions}
            disabled={deniesAllergies}
          />
        </GridItem>
        <GridItem xs={12}>
          <CTextAreaControlled
            name={prefixName + 'orientations'}
            fullWidth
            placeholder='Observações: Evitar alimentos que contenham amendoim em sua composição.'
            label='Observações'
            disabled={deniesAllergies}
          />
        </GridItem>
        <GridItem>
          <CCheckBoxControlled
            name={prefixName + 'deniesAllergies'}
            values={{
              value: true,
              label: 'Negou alergias',
            }}
            disabled={hasAllergies || categoryValue}
          />
        </GridItem>
      </GridWrapper>
    </Box>
  )
}
