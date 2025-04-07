import { Button, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'

import Paper from '@/v3/presentation/components/Paper'
import { CForm } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { UNAUTHENTICATED_ROUTES } from '@/constants/routes'
import { useLazyFetch } from '@/hooks/useFetch'
import { useLayout } from '@/hooks/useLayout'
import { CInputControlled } from '@/v3/presentation/newComponents'

const schema = yup.object({
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
      'Senha deve conter no minímo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caracter especial.',
    )
    .required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
    .required(),
})

export const ResetPassword = () => {
  const router = useRouter()
  const { handleSubmit, control, formState, ...others } = useForm({
    defaultValues: { password: '', passwordConfirm: '' },
    resolver: yupResolver(schema),
  })
  const [apiRequest] = useLazyFetch<any>({ useSpinner: true })
  const { showSnackBar } = useLayout()

  const onSubmit = async (values: any) => {
    const { error } = await apiRequest({
      path: 'reset-password',
      method: 'POST',
      body: {
        password: values.password,
        token: router.query.token,
      },
    })

    if (!error) {
      showSnackBar({
        type: 'success',
        message: 'Senha criada com sucesso!',
      })
      router.push(`${UNAUTHENTICATED_ROUTES.LOGIN_ACCESS}`)
      return
    }
    showSnackBar({
      type: 'error',
      message: error.data.message,
    })
  }

  useEffect(() => {
    if (!router.asPath.includes('token=')) {
      router.push(UNAUTHENTICATED_ROUTES.LOGIN_ACCESS)
    }
  }, [router])

  return (
    <Paper style={{ width: 600 }}>
      <Box
        display='flex'
        alignItems='center'
        mb={2}
        onClick={() => router.push(`${UNAUTHENTICATED_ROUTES.LOGIN_ACCESS}`)}
        className='cursor-pointer'
      >
        <ArrowBack />
        <Typography component='span'>VOLTAR</Typography>
      </Box>
      <Typography variant='h5'>Criar nova senha</Typography>
      <Typography>Crie uma senha para acessar a sua conta.</Typography>
      <Box mt={3}>
        <CForm form={{ handleSubmit, control, formState, ...others }} onSubmit={onSubmit}>
          <GridWrapper>
            <GridItem xs={12}>
              <CInputControlled
                name='password'
                placeholder='Digite sua senha'
                rules={{ required: true }}
                label='Senha'
                inputType='password'
              />
            </GridItem>
            <GridItem xs={12}>
              <CInputControlled
                name='passwordConfirm'
                placeholder='Digite sua confirmação de senha'
                rules={{ required: true }}
                label='Confirmação de senha'
                inputType='password'
              />
            </GridItem>
          </GridWrapper>
          <Box my={2}>
            <Button variant='contained' type='submit' name='submit' fullWidth>
              Continuar
            </Button>
          </Box>
        </CForm>
      </Box>
    </Paper>
  )
}

export default ResetPassword
