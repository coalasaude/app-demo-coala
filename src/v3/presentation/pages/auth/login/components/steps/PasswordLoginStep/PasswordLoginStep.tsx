import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import WhatsAppIcon from '/public/assets/svg/WhatsAppIcon.svg'

import { CForm } from '@/components/Forms'
import { mobilePhoneOrEmailNormalizer } from '@/components/Forms/normalizers/phoneOrEmailNormalizer'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { CButton } from '@/v3/presentation/newComponents/atoms/CButton'
import { NEW_ROUTES } from '@/constants/routes'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { WebViewManager } from '@/services/WebView'
import { useMutateInitLogin } from '@/v3/presentation/hooks/api/@v2/auth/useMutateInitLogin'
import { useMutateLogin } from '@/v3/presentation/hooks/api/@v2/auth/useMutateLogin'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useMutateGetMe } from '@/v3/presentation/hooks/api/@v2/users/me/useMutateMe'
import { extractApiError } from '@/v3/utils/extract-api-error'
import { useMutateExpoToken } from '@/v3/presentation/hooks/api/@v2/auth/useMutateExpoToken'

import { ChangeButtonText } from '../../../../components/ChangeButtonText'
import { IStepLoginProps } from '../../../types'

import { IFormPassword, passwordSchema } from './schema'

export const PasswordLoginStep = ({ setAuthentication, authentication }: IStepLoginProps) => {
  const router = useRouter()
  const { setAuth } = useAuth()
  const { previousStep, nextStep } = useCWizardUrlControlContext()
  const { mutateAsync: login, isPending: isLoading } = useMutateLogin({ skipErrorToast: true })
  const { mutateAsync: initLogin, isPending: isLoadingInitLogin } = useMutateInitLogin()
  const { getMeMutate } = useMutateGetMe()
  const form = useForm({ resolver: yupResolver(passwordSchema) })
  const { mutate: mutateExpoToken } = useMutateExpoToken()

  const setExpoToken = async () => {
    const expoToken = (document as any)?.expoToken

    if (expoToken) {
      mutateExpoToken({ token: expoToken })
    }
  }

  const onSubmit = async (values: IFormPassword) => {
    if (authentication.access) {
      try {
        const data = await login({
          access: authentication.access,
          password: values.password,
        })

        setAuthentication({
          activationStatus: data.activationStatus,
        })

        const { user, institutionalSettings, token } = await getMeMutate({
          accessToken: data.accessToken,
        })

        setAuth({
          user,
          userId: user?.id,
          institutionalSettings,
          token,
          ...data,
        })

        await setExpoToken()

        router.push(NEW_ROUTES.AUTHENTICATED.HELLO.path)
      } catch (error: any) {
        const message = extractApiError(error)

        form.setError('password', {
          type: 'manual',
          message: message || 'Erro ao logar',
        })
      }
    }
  }

  const handleForgotPassword = async () => {
    setAuthentication({
      isChangePassword: true,
    })

    if (authentication.access) {
      await initLogin({
        access: authentication.access,
        isLoginWithCode: true,
      })

      nextStep?.()
    }
  }

  return (
    <Box>
      <Typography variant='h1' mb={1}>
        Qual é a sua senha?
      </Typography>
      <ChangeButtonText
        onClick={previousStep}
        text={mobilePhoneOrEmailNormalizer(authentication.access || '')}
        mb={6}
      />
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <CInputControlled
          name='password'
          id='pass'
          placeholder='Digite sua senha'
          label='Senha'
          size='small'
          fullWidth
          inputType='password'
        />
        <Box mt={4}>
          <CButton fullWidth type='submit' loading={isLoading}>
            Continuar
          </CButton>
        </Box>
        <Box textAlign='center' mt={1} onClick={handleForgotPassword}>
          <CButton variant='link' loading={isLoadingInitLogin}>
            Esqueceu sua senha?
          </CButton>
        </Box>
      </CForm>
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
