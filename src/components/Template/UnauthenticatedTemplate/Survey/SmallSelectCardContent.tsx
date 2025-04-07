import { Box, Typography } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'

type Props = {
  name: string
  Icon: SvgIconComponent
}

const SmallSelectCardContent = ({ name, Icon }: Props) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' textAlign='center'>
      <Box>
        <Icon />
      </Box>
      <Box mt={1} maxWidth='100%'>
        <Typography variant='h6' color='var(--mui-palette-grey-700)'>
          {name}
        </Typography>
      </Box>
    </Box>
  )
}

export default SmallSelectCardContent
