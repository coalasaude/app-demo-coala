import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import WhatsAppIcon from '/public/assets/svg/WhatsAppIcon.svg'

import { CForm } from '@/components/Forms'
import { NEW_ROUTES } from '@/constants/routes'
import { CButton } from '@/v3/presentation/newComponents/atoms/CButton'
import { WebViewManager } from '@/services/WebView'
import { useMutateChangePassword } from '@/v3/presentation/hooks/api/@v2/auth/useMutateChangePassword'
import { useMutateGetMe } from '@/v3/presentation/hooks/api/@v2/users/me/useMutateMe'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { ActivationStatusEnum } from '@/v3/infra/services/login/login'

import { CreatePasswordForm } from '../../../../components/FormCreatePassword'
import {
  IFormCreatePassword,
  createPasswordSchema,
} from '../../../../components/FormCreatePassword/schema'

export const ChangePasswordStep = () => {
  const router = useRouter()
  const { setAuth } = useAuth()
  const { mutateAsync: changePasswordMutate, isPending: isLoading } = useMutateChangePassword()
  const { getMeMutate } = useMutateGetMe()
  const form = useForm({ resolver: yupResolver(createPasswordSchema) })
  const password = form.watch('password') || ''

  const onSubmit = async (values: IFormCreatePassword) => {
    await changePasswordMutate({
      password: values.password,
    })

    const { user, institutionalSettings, token } = await getMeMutate()

    setAuth({
      user,
      userId: user?.id,
      activationStatus: ActivationStatusEnum.ACTIVE,
      institutionalSettings,
      token,
    })

    router.push(NEW_ROUTES.AUTHENTICATED.HELLO.path)
  }

  return (
    <Box>
      <Typography variant='h1' maxWidth={340} mb={1}>
        Pronto, agora é só escolher uma senha nova!
      </Typography>
      <Box mt={2}>
        <CForm id='passwordForm' form={form} onSubmit={onSubmit}>
          <CreatePasswordForm value={password} />
          <Box mt={4}>
            <CButton fullWidth type='submit' loading={isLoading}>
              Concluir
            </CButton>
          </Box>
        </CForm>
      </Box>
      <Box
        position='absolute'
        bottom={30}
        right={30}
        sx={{ cursor: 'pointer' }}
        onClick={() => WebViewManager.open(process.env.WHATSAPP_SUPPORT_URL, '_blank')}
      >
        <WhatsAppIcon />
      </Box>
    </Box>
  )
}
