import dayjs from 'dayjs'

import { CDatePickerControlled } from '@/components/Forms'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { GridItem, GridWrapper } from '@/components/Grid'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'

export const FormUser = () => {
  return (
    <GridWrapper>
      <GridItem xs={6}>
        <CInputControlled
          placeholder='Peso (em kg)'
          name='weight'
          label='Peso (em kg)'
          transform={{
            output: [onlyNumsNormalizer],
          }}
        />
      </GridItem>
      <GridItem xs={6}>
        <CInputControlled
          placeholder='Altura (em cm)'
          name='height'
          label='Altura (em cm)'
          transform={{
            output: [onlyNumsNormalizer],
          }}
        />
      </GridItem>
      <GridItem xs={12}>
        <CDatePickerControlled name='measurementDate' label='Data da medição*' maxDate={dayjs()} />
      </GridItem>
    </GridWrapper>
  )
}
