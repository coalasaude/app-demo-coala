import { Box, ButtonProps, Typography } from '@mui/material'

import useMediaQuery from '@/hooks/useMediaQuery'

interface IPageCounter extends ButtonProps {
  count: number
}
export const PageCounter: React.FC<IPageCounter> = ({ count }) => {
  const isSmallDevice = useMediaQuery('sm')
  return (
    <Box display='flex'>
      <Typography mt={isSmallDevice ? 1 : 0}>
        <b>Total de registros:</b> {count}
      </Typography>
    </Box>
  )
}

export default PageCounter
