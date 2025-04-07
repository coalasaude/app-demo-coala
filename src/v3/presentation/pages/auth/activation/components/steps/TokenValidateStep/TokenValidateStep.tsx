import { Box, Typography } from '@mui/material'

import { ActivationStatusEnum } from '@/v3/infra/services/login/login'
import { useMutateSendCode } from '@/v3/presentation/hooks/api/@v2/auth/useMutateSendCode'
import { useMutateVerifyCode } from '@/v3/presentation/hooks/api/@v2/auth/useMutateVerifyCode'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'

import { TokenValidation } from '../../../../components/TokenValidation'
import { IStepActivationProps } from '../../../types'

export const TokenValidateStep = ({
  activation,
  user,
  accessType,
  setActivation,
  disabledEdit,
}: IStepActivationProps & { disabledEdit?: boolean }) => {
  const { previousStep, goToStep } = useCWizardUrlControlContext()
  const { mutateAsync: verifyTokenMutate } = useMutateVerifyCode()
  const { mutateAsync: sendTokenMutate } = useMutateSendCode()

  const isEmail = accessType === 'email'

  const onResendToken = () => {
    if (activation.access)
      sendTokenMutate({
        access: activation.access,
      })
  }

  const onSubmit = async (code: string) => {
    if (activation.access && code) {
      await verifyTokenMutate({
        code,
      })

      setActivation({
        activationStatus: ActivationStatusEnum.ACTIVATING,
      })

      goToStep?.(0)
    }
  }

  const textValidate = isEmail ? 'e-mail' : 'celular'
  const textAccess = isEmail
    ? 'Digite o código que acabamos de te enviar: '
    : 'Digite o código que enviamos para o seu número: '

  return (
    <Box>
      <TokenValidation
        access={activation.access}
        onSubmit={onSubmit}
        onResendToken={onResendToken}
        goBack={!disabledEdit ? previousStep : undefined}
        title={
          <Typography variant='h1' maxWidth={340} mb={1}>
            Prontinho, {user.name}! Só falta validar o seu {textValidate}. <br />
            {textAccess}
          </Typography>
        }
      />
    </Box>
  )
}
