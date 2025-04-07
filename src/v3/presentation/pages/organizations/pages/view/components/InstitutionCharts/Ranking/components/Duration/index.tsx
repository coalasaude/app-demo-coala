import { Box, Divider, Typography } from '@mui/material'

import StyledContainer from './styles'

type Props = {
  time: number
  title: React.ReactNode
  icon: React.ReactNode
}

export const Duration = ({ time, title, icon }: Props) => {
  let convertedTime = ''
  if (time < 60) {
    convertedTime = `${time} seg`
  }

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  if (seconds === 0) {
    convertedTime = `${minutes} min`
  } else {
    convertedTime = `${minutes} min ${seconds} seg`
  }

  return (
    <StyledContainer minHeight={131} minWidth={118}>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box mr={2}>{icon}</Box>
        <Box ml={[, , , 1]}>
          <Typography whiteSpace='pre-line' variant='h6'>
            {title}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ width: '100%', my: 1, borderWidth: '1px' }} />

      <Box display='flex' alignItems='center'>
        <Typography variant='h3' fontWeight={600}>
          {convertedTime}
        </Typography>
      </Box>
    </StyledContainer>
  )
}

export default Duration
