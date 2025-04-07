import { Box } from '@mui/material'

import { NotFound } from '@/components/NotFound'
import Paper from '@/v3/presentation/components/Paper'

const EmptyComments = () => {
  return (
    <Paper px={2} pb={2}>
      <Box bgcolor='var(--mui-palette-grey-200)' borderRadius={2}>
        <NotFound text='Ainda não há comentários nessa tarefa' />
      </Box>
    </Paper>
  )
}

export default EmptyComments
