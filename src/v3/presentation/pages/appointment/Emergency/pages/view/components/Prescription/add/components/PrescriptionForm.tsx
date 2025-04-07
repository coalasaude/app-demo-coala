import { Box } from '@mui/system'

import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { CRadioButtonGroupControlled } from '@/v3/presentation/newComponents'
import { GridItem, GridWrapper } from '@/components/Grid'
import { maxLength } from '@/components/Forms/normalizers/maxLengthNormalizer'
import { toNumber } from '@/components/Forms/parser/toNumber'
import { CInputControlled } from '@/v3/presentation/newComponents'

export const PrescriptionForm = () => {
  return (
    <>
      <Box mb={2}>
        <CRadioButtonGroupControlled
          row
          name='type_prescription'
          options={[
            { value: 'SIMPLE', label: 'Simples' },
            { value: 'SPECIAL_CONTROL', label: 'Controle Especial' },
          ]}
        />
      </Box>
      <GridWrapper>
        <GridItem xs={6}>
          <CInputControlled
            name='valid_until'
            placeholder='Digite a data de validade'
            variant='outlined'
            label='Valido até'
            transform={{
              input: [onlyNumsNormalizer],
              output: [maxLength(2), toNumber],
            }}
          />
        </GridItem>
      </GridWrapper>
    </>
  )
}

export default PrescriptionForm
