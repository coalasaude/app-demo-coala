import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import Paper from '@/v3/presentation/components/Paper'
import { NEW_ROUTES } from '@/constants/routes'

type Props = {
  title: string
  subtitle: string
  type: string
  icon: React.ReactNode
}

export const RegistrationCard = ({ subtitle, title, type, icon }: Props) => {
  const router = useRouter()

  const onSubmit = async (type: string) => {
    router.push(`${NEW_ROUTES.UNAUTHENTICATED.REGISTRATION.FORM.path}?type=${type}`)
  }

  return (
    <Paper
      display='flex'
      p={2}
      mt={2}
      onClick={() => onSubmit(type)}
      alignItems='center'
      sx={{ cursor: 'pointer' }}
      gap={3}
    >
      {icon}
      <Box display='flex' flexDirection='column'>
        <Typography variant='h4'>{title}</Typography>
        <Typography variant='h6' fontWeight={400}>
          {subtitle}
        </Typography>
      </Box>
    </Paper>
  )
}

export default RegistrationCard
