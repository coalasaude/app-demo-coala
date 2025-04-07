import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import Complete from '/public/assets/svg/RegistrationForm/Complete.svg'

import { CButton } from '@/v3/presentation/newComponents'

import AuthenticationContainer from '../../../components/AuthenticationContainer'

export const RegistrationCompletePage = () => {
  const router = useRouter()
  const onSubmit = async () => {
    router.push('/')
  }

  return (
    <AuthenticationContainer>
      <Typography variant='h1'>Cadastro concluído!</Typography>
      <Typography variant='h4' fontWeight={400} mb={4}>
        Você foi cadastrado em nosso sistema e um de nossos docs entrará em contato em breve!
      </Typography>
      <Box display='flex' justifyContent='center'>
        <Complete />
      </Box>

      <Box mt={4}>
        <CButton variant='primary' fullWidth onClick={onSubmit}>
          Retornar a tela inicial
        </CButton>
      </Box>
    </AuthenticationContainer>
  )
}

export default RegistrationCompletePage
