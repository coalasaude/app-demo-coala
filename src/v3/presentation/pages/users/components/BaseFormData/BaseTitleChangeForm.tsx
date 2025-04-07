import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { getTextChangeForm } from './utils/get-text-change-form'

type Props = {
  children: React.ReactNode
  type: 'email' | 'phone'
  field?: string
}

export const BaseTitleChangeForm = ({ children, type = 'email', field = '-' }: Props) => {
  const { user: authUser } = useAuth()
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const isSameUser = authUser?.id === userId
  const { title, fieldTitle, body } = getTextChangeForm(type, isSameUser)

  return (
    <Box>
      <Typography variant='h1' mb={1}>
        {title}
      </Typography>

      <Box display='flex'>
        <Typography variant='body1' color='var(--mui-palette-primary-main)' mb={1} mr={0.5}>
          {fieldTitle}
        </Typography>
        <Typography variant='body1'>{field}</Typography>
      </Box>

      <Typography variant='body1' mb={2}>
        {body}
      </Typography>

      {children}
    </Box>
  )
}
