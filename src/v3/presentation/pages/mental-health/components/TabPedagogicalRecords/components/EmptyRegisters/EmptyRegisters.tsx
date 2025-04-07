import { Box, Stack, Typography } from '@mui/material'

import EmptyReportsSvg from 'public/assets/svg/MentalHealth/EmptyReports.svg'
import EmptyX from 'public/assets/svg/MentalHealth/EmptyX.svg'

export const EmptyRegisters = () => {
  return (
    <Stack
      direction={'row'}
      width='100%'
      justifyContent='center'
      alignItems='center'
      gap={[0, 0, 0, 2]}
      pl={[2, 0]}
      border='2px solid var(--mui-palette-grey-200)'
      borderRadius={2}
    >
      <Box maxWidth={182}>
        <EmptyX />
        <Typography variant='h2' color={(theme) => theme.palette.primary.dark}>
          Nenhum registro adicionado.
        </Typography>
      </Box>
      <EmptyReportsSvg
        style={{
          width: 240,
        }}
      />
    </Stack>
  )
}
