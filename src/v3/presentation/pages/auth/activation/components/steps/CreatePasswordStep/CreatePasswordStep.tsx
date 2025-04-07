import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { usePostHog } from 'posthog-js/react'

import { CForm } from '@/components/Forms'
import { NEW_ROUTES } from '@/constants/routes'
import { CButton } from '@/v3/presentation/newComponents/atoms/CButton'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { ActivationStatusEnum } from '@/v3/infra/services/login/login'
import { useMutateCreatePassword } from '@/v3/presentation/hooks/api/@v2/auth/useMutateCreatePassword'
import { useMutateGetMe } from '@/v3/presentation/hooks/api/@v2/users/me/useMutateMe'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'

import { CreatePasswordForm } from '../../../../components/FormCreatePassword'
import {
  IFormCreatePassword,
  createPasswordSchema,
} from '../../../../components/FormCreatePassword/schema'

export const CreatePasswordStep = () => {
  const router = useRouter()
  const { setAuth, auth } = useAuth()
  const { mutateAsync: createPasswordMutate, isPending: isLoading } = useMutateCreatePassword()
  const { getMeMutate, isPending: isLoadingMe } = useMutateGetMe()
  const form = useForm({ resolver: yupResolver(createPasswordSchema) })
  const password = form.watch('password') || ''
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()

  const onSubmit = async (values: IFormCreatePassword) => {
    await createPasswordMutate({
      password: values.password,
    })

    const { user, institutionalSettings, token } = await getMeMutate()

    setAuth({
      token,
      activationStatus: ActivationStatusEnum.ACTIVE,
      user,
      userId: user?.id,
      institutionalSettings,
    })

    posthog.capture('create_password_duration', {
      time_spent: getCount(),
    })

    router.push(auth.redirectPage || NEW_ROUTES.AUTHENTICATED.HELLO.path)
  }

  return (
    <Box>
      <Typography variant='h1' maxWidth={340} mb={1}>
        Que tal definirmos uma senha?
      </Typography>
      <Box mt={2}>
        <CForm id='passwordForm' form={form} onSubmit={onSubmit}>
          <CreatePasswordForm value={password} />
          <Box mt={4}>
            <CButton fullWidth type='submit' loading={isLoadingMe || isLoading}>
              Concluir
            </CButton>
          </Box>
        </CForm>
      </Box>
    </Box>
  )
}
