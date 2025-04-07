import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { mobilePhoneOrEmailNormalizer } from '@/components/Forms/normalizers/phoneOrEmailNormalizer'
import { ActivationStatusEnum } from '@/v3/infra/services/login/login'
import { CButton } from '@/v3/presentation/newComponents/atoms/CButton'
import { useMutateActivateUser } from '@/v3/presentation/hooks/api/@v2/auth/useMutateActivateUser'

import { IStepActivationProps } from '../../../types'
import { FormActivateUser } from '../../FormActivateUser'

import { IFormUserData, userDataSchema } from './schema'

export const UserDataStep = ({ setActivation, user }: IStepActivationProps) => {
  const { mutateAsync: activateUserMutate, isPending: isLoading } = useMutateActivateUser()

  const form = useForm({
    resolver: yupResolver(userDataSchema),
    defaultValues: {
      name: user?.name,
      lastname: user?.lastName,
      cpf: user?.cpf,
      isSigned: false,
    },
  })

  const onSubmit = async (values: IFormUserData) => {
    await activateUserMutate({
      cpf: values.cpf,
      lastName: values.lastname,
      name: values.name,
      isSigned: true,
    })

    setActivation({
      activationStatus: ActivationStatusEnum.MISSING_PASSWORD,
    })
  }

  const isSigned = form.watch('isSigned')

  return (
    <Box>
      <Typography variant='h1' mb={1}>
        Estamos quase lá, {user.name}!
      </Typography>
      <Typography variant='body1' mb={4}>
        {mobilePhoneOrEmailNormalizer(user.email || user.telephone || '')}
      </Typography>
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <FormActivateUser user={user} />
        <Box mt={4}>
          <CButton disabled={!isSigned} type='submit' fullWidth loading={isLoading}>
            Entrar
          </CButton>
        </Box>
      </CForm>
    </Box>
  )
}
