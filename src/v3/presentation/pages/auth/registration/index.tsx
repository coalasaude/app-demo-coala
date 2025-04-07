import { Box, Typography } from '@mui/material'

import Manager from '/public/assets/svg/RegistrationForm/Manager.svg'
import Collaborator from '/public/assets/svg/RegistrationForm/Collaborator.svg'
import Responsible from '/public/assets/svg/RegistrationForm/Responsible.svg'

import { useRouter } from 'next/router'

import { CButton } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'

import AuthenticationContainer from '../components/AuthenticationContainer'

import RegistrationCard from './components/RegistrationCard'

export const RegistrationPage = () => {
  const router = useRouter()
  const isMobile = useMediaQuery('sm')

  const handleClick = () => {
    router.push('/')
  }

  const style = {
    height: 58,
  }

  return (
    <AuthenticationContainer>
      <Typography variant='h1'>Preencha o formulário</Typography>
      <Typography variant='h4' fontWeight={400} mb={4}>
        Em breve um de nossos docs fará contato com você :)
      </Typography>

      <RegistrationCard
        title='Sou gestor escolar'
        icon={<Manager style={{ width: isMobile ? 95 : 64, ...style }} />}
        subtitle='E ocupo o cargo de diretor, coordenador, mantenedor ou administrador da instituição'
        type='Gestor'
      />
      <RegistrationCard
        title='Sou colaborador'
        icon={<Collaborator style={{ width: isMobile ? 70 : 51, ...style }} />}
        subtitle='Trabalho numa escola e gostaria de saber como a Coala funciona.'
        type='Colaborador'
      />
      <RegistrationCard
        title='Sou responsável de um aluno'
        icon={<Responsible style={{ width: isMobile ? 44 : 48, ...style }} />}
        subtitle='E quero saber como a Coala funciona.'
        type='Responsável'
      />
      <Box mt={4}>
        <CButton variant='primary' fullWidth type='submit' onClick={handleClick}>
          Já tenho cadastro
        </CButton>
      </Box>
    </AuthenticationContainer>
  )
}

export default RegistrationPage
