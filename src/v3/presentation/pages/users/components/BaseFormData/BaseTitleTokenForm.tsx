import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { CButton } from '@/v3/presentation/newComponents'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'

type Props = {
  children: React.ReactNode
  type: 'email' | 'phone'
  field?: string
}

export const BaseTitleTokenForm = ({ children, type = 'email', field = '-' }: Props) => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)

  const handleRedirect = () => {
    if (type === 'email') {
      router.push(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.EDIT.CHANGE_EMAIL.path, {
          userId,
        }),
      )
    } else {
      router.push(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.EDIT.CHANGE_TELEPHONE.path, {
          userId,
        }),
      )
    }
  }

  return (
    <Box>
      <Typography variant='h1' mb={1}>
        {type === 'email' ? 'Verifique o endereço de e-mail' : 'Verifique o número de telefone'}
      </Typography>

      <Box display='flex' alignItems='center'>
        <Typography variant='body1'>{field}</Typography>
        <CButton variant='link' onClick={handleRedirect}>
          Alterar
        </CButton>
      </Box>

      <Typography variant='body1' mb={2}>
        {type === 'email'
          ? 'Nós enviamos um código para o seu endereço de e-mail. Insira o código no campo abaixo.'
          : 'Nós enviamos um SMS com um código para o seu telefone. Insira o código no campo abaixo.'}
      </Typography>

      {children}
    </Box>
  )
}
