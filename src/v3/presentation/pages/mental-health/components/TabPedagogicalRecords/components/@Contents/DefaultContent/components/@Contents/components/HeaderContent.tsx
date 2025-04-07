import { Box, Typography } from '@mui/material'

export const HeaderContent = ({
  text,
  num,
  numText = 'interesse',
}: {
  text: string
  num: number
  numText?: string
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--mui-palette-grey-500)',
          color: 'white',
          height: 24,
          width: 200,
          fontSize: 14,
          borderRadius: 1,
        }}
      >
        {text}
      </Box>
      <Typography variant='body2' color='var(--mui-palette-grey-500)'>
        {num} {numText}
        {num > 1 ? 's' : ''}
      </Typography>
    </Box>
  )
}
