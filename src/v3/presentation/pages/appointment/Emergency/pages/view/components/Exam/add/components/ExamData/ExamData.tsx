import Router from 'next/router'

import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { GridItem, GridWrapper } from '@/components/Grid'
import { maxLength } from '@/components/Forms/normalizers/maxLengthNormalizer'
import {
  CBaseContainer,
  CInputControlled,
  CTextAreaControlled,
} from '@/v3/presentation/newComponents'

export const ExamForm = ({ isPending = false }: { isPending: boolean }) => {
  return (
    <CBaseContainer
      title='Exame'
      isLoading={isPending}
      buttonLabel='Registrar'
      onCancel={() => Router.back()}
    >
      <GridWrapper>
        <GridItem pb={2} xs={12} md={4}>
          <CInputControlled
            name='valid_until'
            variant='outlined'
            placeholder='Digite a validade'
            label='Validade (dias)'
            transform={{
              input: [onlyNumsNormalizer],
              output: [maxLength(2)],
            }}
          />
        </GridItem>
        <GridItem pb={2} xs={12}>
          <CTextAreaControlled
            name='description'
            placeholder='Digite a descrição '
            variant='outlined'
            label='Descrição'
          />
        </GridItem>
        <GridItem pb={2} xs={12}>
          <CTextAreaControlled
            placeholder='Digite a indicação'
            name='recommendation'
            variant='outlined'
            label='Indicação'
          />
        </GridItem>
      </GridWrapper>
    </CBaseContainer>
  )
}

export default ExamForm
