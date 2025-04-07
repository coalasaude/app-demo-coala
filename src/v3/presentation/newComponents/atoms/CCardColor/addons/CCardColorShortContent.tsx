import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'

import { CTooltip } from '@/v3/presentation/newComponents'

type Props = {
  Icon: ReactNode
  title: string
  number: number | string
  titleColor: string
}

export const CCardColorShortContent = ({ number, title, Icon, titleColor }: Props) => {
  return (
    <Box
      display='flex'
      textAlign='start'
      p={1}
      alignItems={['center', 'flex-start']}
      gap={[5, 0]}
      flexDirection={['row', 'column']}
    >
      <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
        {Icon && Icon}
        <Typography variant='h1' fontWeight={700} color={titleColor}>
          {number}
        </Typography>
      </Box>
      <CTooltip description={title}>
        <Typography variant='h5' fontWeight={500} color={titleColor} width={['100%', '90%']} noWrap>
          {title}
        </Typography>
      </CTooltip>
    </Box>
  )
}
