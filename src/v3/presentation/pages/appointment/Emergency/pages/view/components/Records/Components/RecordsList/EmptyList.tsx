import { Box, Typography } from '@mui/material'

import { useBreakpoint } from '@/hooks/useBreakpoints'

interface EmptyListProps {
  hasPatient?: boolean
}

export const EmptyList = ({ hasPatient }: EmptyListProps) => {
  const isMobile = useBreakpoint('sm')

  if (!hasPatient || isMobile) return null

  return (
    <Box
      bgcolor={(theme) => theme.palette.grey[100]}
      borderRadius={0.5}
      px={2}
      py={4}
      textAlign='center'
    >
      <Typography variant='caption' color={(theme) => theme.palette.grey[400]}>
        Clique acima para adicionar <br /> um novo registro.
      </Typography>
    </Box>
  )
}
