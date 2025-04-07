import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import StarsIcon from '@mui/icons-material/Stars'

export const AppointmentDate = ({ createdAt, isNew }: { createdAt: Date; isNew: boolean }) => (
  <Box display='flex' alignItems='center' justifyContent='flex-start'>
    <Typography variant='body1'>{dayjs(createdAt).format('DD/MM/YYYY HH:mm')}</Typography>
    {isNew && (
      <StarsIcon
        sx={{
          color: 'var(--mui-palette-primary-main)',
          fontSize: 'inherit',
          mb: 0.2,
        }}
      />
    )}
  </Box>
)
