import { SvgIconComponent } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

type Props = {
  Icon: SvgIconComponent
  title: string
  number: number | string
  titleColor: string
}

export const CCardColorMainContent = ({ number, title, Icon, titleColor }: Props) => {
  return (
    <Box display='flex' textAlign='start' flexDirection='column' p={1} sx={{ gap: 2 }}>
      <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Icon style={{ fill: titleColor, fontSize: 35 }} />
        <Typography variant='h1' fontWeight={700} color={titleColor}>
          {number}
        </Typography>
      </Box>
      <Typography ml={1} variant='h5' fontWeight={500} color={titleColor}>
        {title}
      </Typography>
    </Box>
  )
}
