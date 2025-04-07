import { Box, Typography } from '@mui/material'

export const ActionButtonText = ({ text }: { text: string }) => {
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Typography
        display='block'
        margin='auto'
        component='span'
        textAlign='center'
        variant='body2'
        color='var(--mui-palette-grey-700)'
      >
        {text}
      </Typography>
    </Box>
  )
}
