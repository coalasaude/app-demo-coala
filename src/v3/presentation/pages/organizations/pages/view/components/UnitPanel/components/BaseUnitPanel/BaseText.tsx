import { Box, Divider, Typography } from '@mui/material'

import { CTooltip } from '@/v3/presentation/newComponents'

type Props = {
  number: number | string
  title: string
  descriptionTooltip?: string
}

export const BaseText = ({ number, title, descriptionTooltip }: Props) => {
  return (
    <Box display='flex' alignItems='center'>
      <Box pl={2}>
        <Typography variant='h5' fontWeight={400} mr={1}>
          {title}
        </Typography>
      </Box>

      <Divider orientation='vertical' flexItem sx={{ mx: 2, height: 30, borderWidth: '2px' }} />
      {descriptionTooltip ? (
        <CTooltip description={descriptionTooltip} placement='top'>
          <Box display='flex' alignItems='center'>
            <Typography variant='h5' fontWeight={400}>
              {number}
            </Typography>
          </Box>
        </CTooltip>
      ) : (
        <Typography variant='h5' fontWeight={400}>
          {number}
        </Typography>
      )}
    </Box>
  )
}

export default BaseText
