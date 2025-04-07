import { Typography } from '@mui/material'

import { GridItem, GridWrapper } from '@/components/Grid'
import { CTextAreaControlled } from '@/v3/presentation/newComponents'

export function RequestAnalysisForm() {
  return (
    <GridWrapper>
      <GridItem xs={12}>
        <Typography mb={1} variant='h4'>
          Descreva abaixo o motivo da solicitação
        </Typography>
        <CTextAreaControlled
          minRows={8}
          maxRows={8}
          label=''
          name='reason'
          placeholder='Escreva aqui sobre a necessidade da análise'
          fullWidth
        />
      </GridItem>
    </GridWrapper>
  )
}
