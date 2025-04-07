import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import Button from '@/v3/presentation/components/Button'
import { NEW_ROUTES } from '@/constants/routes'

export const EndCallMeeting = () => {
  const router = useRouter()

  const handleRouter = () => {
    router.push(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.LIST.path)
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      textAlign='center'
      height='100%'
      sx={{
        backgroundImage: `url('/assets/svg/AppointmentsView/EndVideoCall.svg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: 'var(--mui-palette-grey-300)',
      }}
    >
      <Box zIndex={1}>
        <Typography variant='h1' fontSize={30} color='var(--mui-palette-primary-main)'>
          A Chamada foi finalizada.
        </Typography>
        <Typography variant='body2' color='var(--mui-palette-primary-main)'>
          Você pode acessar outros atendimentos retornando para a listagem.
        </Typography>

        <Box mt={3}>
          <Button size='small' variant='outlined' onClick={() => handleRouter()}>
            Lista de atendimentos
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default EndCallMeeting
