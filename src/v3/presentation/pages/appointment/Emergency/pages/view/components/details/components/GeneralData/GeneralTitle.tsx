import { Box, Typography } from '@mui/material'
import { Circle } from '@mui/icons-material'

export const GeneralTitle = ({ isFinished }: { isFinished?: boolean }) => {
  return (
    <Box pl={2} py={2} display='flex' justifyContent='space-between'>
      <Typography variant='h4'>Detalhes do atendimento</Typography>
      {isFinished && (
        <Box display='flex' alignItems='center'>
          <Typography variant='h5'>Finalizado</Typography>
          <Circle
            fontSize='inherit'
            sx={{
              color: 'var(--mui-palette-grey-700)',
              marginLeft: 1,
              marginRight: 1,
            }}
          />
        </Box>
      )}
    </Box>
  )
}

export default GeneralTitle
