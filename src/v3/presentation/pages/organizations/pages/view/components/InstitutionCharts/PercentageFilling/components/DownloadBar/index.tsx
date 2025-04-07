import { Box } from '@mui/material'

import { CProgressBar } from '@/v3/presentation/newComponents'

export const DownloadBar = ({ value }: { value: number }) => {
  return (
    <Box width='100%'>
      <CProgressBar
        color='primary'
        value={value}
        state='default'
        sx={{
          height: 8,
        }}
      />
    </Box>
  )
}

export default DownloadBar
