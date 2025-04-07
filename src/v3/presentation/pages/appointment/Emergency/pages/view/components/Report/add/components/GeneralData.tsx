import { Box } from '@mui/material'
import Router from 'next/router'

import { GridItem, GridWrapper } from '@/components/Grid'
import {
  CBaseContainer,
  CInputControlled,
  CTextAreaControlled,
} from '@/v3/presentation/newComponents'

export const GeneralData = ({ isPending = false }: { isPending?: boolean }) => {
  return (
    <CBaseContainer
      title='Relatório'
      isLoading={isPending}
      buttonLabel='Registrar'
      onCancel={() => Router.back()}
    >
      <GridWrapper>
        <GridItem xs={12}>
          <CInputControlled
            variant='outlined'
            placeholder='Digite o título'
            name='title'
            label='Título'
          />
        </GridItem>
      </GridWrapper>
      <Box mt={2} />
      <GridWrapper>
        <GridItem xs={12}>
          <CTextAreaControlled
            placeholder='Digite o corpo do texto'
            name='body'
            variant='outlined'
            label='Corpo do texto'
          />
        </GridItem>
      </GridWrapper>
    </CBaseContainer>
  )
}

export default GeneralData
