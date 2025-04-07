import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { CForm, phoneNormalizer } from '@/components/Forms'
import { mobilePhoneOrEmailNormalizer } from '@/components/Forms/normalizers/phoneOrEmailNormalizer'
import { ActivationStatusEnum } from '@/v3/infra/services/login/login'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { CButton } from '@/v3/presentation/newComponents/atoms/CButton'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { useMutateSendCode } from '@/v3/presentation/hooks/api/@v2/auth/useMutateSendCode'

import { IStepActivationProps } from '../../../types'

import { IFormAccess, emailAccessSchema, phoneAccessSchema } from './schema'

export const InsertAccessStep = ({ setActivation, accessType, user }: IStepActivationProps) => {
  const { nextStep } = useCWizardUrlControlContext()
  const { mutateAsync: sendTokenMutate, isPending: isLoading } = useMutateSendCode()

  const isEmail = accessType === 'email'
  const form = useForm({ resolver: yupResolver(isEmail ? emailAccessSchema : phoneAccessSchema) })

  const onSubmit = async (values: IFormAccess) => {
    await sendTokenMutate({
      access: values.access,
    })

    const validateStatus = isEmail
      ? ActivationStatusEnum.VALIDATE_EMAIL
      : ActivationStatusEnum.VALIDATE_PHONE

    setActivation({ access: values.access, activationStatus: validateStatus })

    nextStep?.()
  }

  const textAccessType = isEmail ? 'e-mail' : 'número de celular'
  const loggedAccess = (isEmail ? user.telephone : user.email) || ''

  return (
    <Box>
      <Typography variant='h1' mb={1}>
        Legal, {user.name}! agora só falta validar o seu {textAccessType}.
      </Typography>
      <Typography variant='body1' mb={6}>
        {mobilePhoneOrEmailNormalizer(loggedAccess)}
      </Typography>
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <CInputControlled
          name='access'
          size='small'
          fullWidth
          placeholder='Digite seu e-mail'
          label='E-mail'
          {...(!isEmail && {
            transform: { input: phoneNormalizer },
            placeholder: 'Digite seu celular',
            label: 'Celular',
          })}
        />
        <Box mt={4}>
          <CButton fullWidth type='submit' loading={isLoading}>
            Continuar
          </CButton>
        </Box>
      </CForm>
    </Box>
  )
}
