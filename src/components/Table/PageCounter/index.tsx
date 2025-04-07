import { Box, ButtonProps, Typography } from '@mui/material'

import useMediaQuery from '@/hooks/useMediaQuery'

interface IPageCounter extends ButtonProps {
  count: number
}
export const PageCounter: React.FC<IPageCounter> = ({ count }) => {
  const isSmallDevice = useMediaQuery('sm')
  return (
    <Box display='flex' mt={isSmallDevice ? 1 : 0} gap='4px'>
      <Typography variant='h6' fontWeight={600} color='var(--mui-palette-grey-500)'>
        Total:
      </Typography>
      <Typography variant='body2' color='var(--mui-palette-grey-500)'>
        {count}
      </Typography>
    </Box>
  )
}

export default PageCounter
