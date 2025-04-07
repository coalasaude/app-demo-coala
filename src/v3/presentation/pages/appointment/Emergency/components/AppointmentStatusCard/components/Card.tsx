import { SvgIconComponent } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

type Props = {
  Icon: SvgIconComponent
  title: string
  number: number | string
  titleColor: string
  bgColor: string
}

export const Card = ({ number, title, Icon, bgColor, titleColor }: Props) => {
  return (
    <Box
      display='flex'
      textAlign='center'
      bgcolor={bgColor}
      justifyContent='space-between'
      alignItems='center'
      p={2}
      borderRadius={1}
      height={48}
      width={238}
    >
      <Box display='flex' alignItems='center'>
        <Icon style={{ fill: titleColor, fontSize: 35 }} />
        <Typography ml={1} variant='h5' fontWeight={500} color={titleColor}>
          {title}
        </Typography>
      </Box>
      <Typography variant='h1' fontWeight={700} color={titleColor}>
        {number}
      </Typography>
    </Box>
  )
}
