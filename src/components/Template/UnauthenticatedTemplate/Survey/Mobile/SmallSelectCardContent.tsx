import { Box, Typography } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'

type Props = {
  name: string
  Icon: SvgIconComponent
}

const SmallSelectCardContent = ({ name, Icon }: Props) => {
  return (
    <>
      <Icon
        style={{
          marginRight: '8px',
          minWidth: 50,
          minHeight: 50,
          width: 50,
          height: 50,
        }}
      />
      <Box>
        <Typography variant='h3' textOverflow='ellipsis'>
          {name}
        </Typography>
      </Box>
    </>
  )
}

export default SmallSelectCardContent
