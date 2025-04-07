import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import WhatsAppIcon from '/public/assets/svg/WhatsAppIcon.svg'

import { NEW_ROUTES } from '@/constants/routes'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { WebViewManager } from '@/services/WebView'
import { useMutateInitLogin } from '@/v3/presentation/hooks/api/@v2/auth/useMutateInitLogin'
import { useMutateLogin } from '@/v3/presentation/hooks/api/@v2/auth/useMutateLogin'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useMutateGetMe } from '@/v3/presentation/hooks/api/@v2/users/me/useMutateMe'
import { ActivationStatusEnum } from '@/v3/infra/services/login/login'

import { TokenValidation } from '../../../../components/TokenValidation'
import { IStepLoginProps } from '../../../types'

export type ITokenLoginStep = IStepLoginProps & {
  accessType: 'email' | 'phone'
  isChangePassword?: boolean
}

export const TokenLoginStep = ({
  accessType,
  setAuthentication,
  authentication,
  isChangePassword,
}: ITokenLoginStep) => {
  const router = useRouter()
  const { setAuth } = useAuth()
  const { goToStep, nextStep } = useCWizardUrlControlContext()
  const { mutateAsync: loginMutate } = useMutateLogin()
  const { mutate: initLoginMutate } = useMutateInitLogin()
  const { getMeMutate } = useMutateGetMe()

  const onResendToken = () => {
    if (authentication.access)
      initLoginMutate({
        access: authentication.access,
        isLoginWithCode: isChangePassword,
      })
  }

  const onSubmit = async (code: string) => {
    if (authentication.access && code) {
      const data = await loginMutate({
        access: authentication.access,
        code,
      })

      const { user, institutionalSettings, token } = await getMeMutate({
        accessToken: data.accessToken,
      })
      const activationStatus = isChangePassword
        ? ActivationStatusEnum.MISSING_PASSWORD
        : data.activationStatus

      setAuthentication({
        activationStatus,
        ...(user.name && { userName: user.name }),
      })

      user.hasPassword = false

      setAuth({
        user,
        token,
        userId: user?.id,
        institutionalSettings,
        ...data,
        activationStatus,
        redirectPage: router.query?.page
          ? decodeURIComponent(router.query.page as string)
          : undefined,
      })

      if (!isChangePassword) {
        let path = NEW_ROUTES.UNAUTHENTICATED.ACTIVATION.path
        if (router.query?.page) path += '?page=' + (router.query.page as string)

        await router.replace(path)

        return
      }

      nextStep?.()
    }
  }

  const accessText = accessType === 'email' ? 'e-mail' : 'celular'

  return (
    <Box>
      <TokenValidation
        access={authentication.access}
        onSubmit={onSubmit}
        onResendToken={onResendToken}
        goBack={() => goToStep?.(0)}
        title={
          <Typography variant='h1' maxWidth={340} mb={1}>
            {isChangePassword ? (
              <>Digite o código que enviamos para o seu {accessText}</>
            ) : (
              <>
                Olá, {authentication.userName}! Notamos que é o seu primeiro acesso! <br />
                Digite o código que enviamos para o seu {accessText}:
              </>
            )}
          </Typography>
        }
      />
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
