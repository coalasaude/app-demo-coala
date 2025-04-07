import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Box, BoxProps, Typography } from '@mui/material'

import { spacing } from '@/utils/spacing'

export type StepContainerInfoProps = BoxProps
export const StepContainerInfo = ({ children, ...props }: StepContainerInfoProps) => {
  return (
    <Box display='flex' {...props}>
      <InfoOutlinedIcon sx={{ mr: spacing(1), color: 'var(--mui-palette-grey-500)' }} />
      <Typography
        variant='body2'
        color='var(--mui-palette-grey-500)'
        mx={['auto', 'auto', '0px']}
        textAlign={['center', 'center', 'start']}
      >
        {children}
      </Typography>
    </Box>
  )
}
