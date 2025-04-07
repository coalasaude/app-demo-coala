import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { get } from 'lodash'

import Paper from '@/v3/presentation/components/Paper'
import { CForm } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { UNAUTHENTICATED_ROUTES } from '@/constants/routes'
import { useLazyFetch } from '@/hooks/useFetch'
import { useLayout } from '@/hooks/useLayout'
import { GoBack } from '@/components/Template/GoBack'
import { CInputControlled } from '@/v3/presentation/newComponents'

const schema = yup.object({
  email: yup.string().required(),
})

export const RecoveryPassword = () => {
  const { handleSubmit, control, formState, ...others } = useForm({
    defaultValues: { email: '' },
    resolver: yupResolver(schema),
  })
  const [apiRequest, { error }] = useLazyFetch<any>({ useSpinner: true })
  const { showSnackBar } = useLayout()

  const onSubmit = async (values: any) => {
    const { error } = await apiRequest({
      path: 'send-forget-password',
      method: 'POST',
      body: values,
    })

    if (!error) {
      showSnackBar({
        type: 'success',
        message: 'Foi enviado um e-mail com as instruções para você criar uma nova senha.',
      })
      return
    }
    showSnackBar({
      type: 'error',
      message: error.data.message,
    })
  }

  return (
    <Paper>
      <GoBack route={UNAUTHENTICATED_ROUTES.LOGIN_ACCESS} />
      <Typography variant='h5'>Recuperar senha</Typography>
      <Typography>
        Insira o seu e-mail para receber um código de verificação e realizar a alteração da sua
        senha.
      </Typography>
      <Box mt={3}>
        <CForm form={{ handleSubmit, control, formState, ...others }} onSubmit={onSubmit}>
          <GridWrapper>
            <GridItem xs={12}>
              <CInputControlled
                name='email'
                placeholder='Digite seu e-mail'
                rules={{ required: true }}
                label='E-mail'
                error={get(error, 'data.email')}
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

export default RecoveryPassword
