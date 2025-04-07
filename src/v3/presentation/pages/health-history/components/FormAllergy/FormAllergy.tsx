import { Box } from '@mui/material'

import { CSelectControlled } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'
import CChip from '@/v3/presentation/newComponents/atoms/CChip'

import { CRadioGrid } from '../../../../components/CRadioGrid'

import { IAlergyFromProps } from './types'

export function FormAllergy<T, R>({
  prefixName = '',
  categoryOptions,
  symptomOptions,
  watch,
}: IAlergyFromProps<T, R>) {
  const categoryId = watch(prefixName + 'categoryId')
  const categoryIdMatch = categoryOptions.find(({ value }) => String(value) === categoryId)?.label
  const otherCategory = categoryIdMatch === 'Outros'

  return (
    <Box mb={2.5}>
      <CRadioGrid
        name={prefixName + 'categoryId'}
        label='Categoria*'
        rules={{ required: true }}
        options={categoryOptions}
        maxItemColumns={2}
        maxItemColumnsMobile={1}
      />
      {otherCategory && (
        <CInputControlled
          sx={{ mt: 2, mb: -2 }}
          name={prefixName + 'otherCategory'}
          placeholder='Descreva a categoria da alergia'
          label='Descreva a categoria da alergia'
          fullWidth
        />
      )}

      <GridWrapper mt={3}>
        <GridItem xs={12} md={6}>
          <CInputControlled
            name={prefixName + 'causerAgent'}
            placeholder='O que causa a alergia?*ex. Abelhas, poeira, etc.'
            label='Agente causador*'
            fullWidth
            rules={{ required: true }}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CSelectControlled
            name={prefixName + 'symptom'}
            label='Sintomas*'
            placeholder='Sintomas* coceira, febre, etc.'
            fullWidth
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
          />
        </GridItem>
      </GridWrapper>
      <Box mt={4}>
        <CTextAreaControlled
          name={prefixName + 'orientations'}
          fullWidth
          placeholder='Observações: Evitar alimentos que contenham amendoim em sua composição.'
          label='Observações'
        />
      </Box>
    </Box>
  )
}
