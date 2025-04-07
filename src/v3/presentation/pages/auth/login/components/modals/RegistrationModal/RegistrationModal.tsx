import { useRouter } from 'next/router'
import { Box, Typography } from '@mui/material'

import { Experimental_CVerticalModal } from '@/v3/presentation/newComponents/layout/Experimental_CVerticalModal'

import PlaygroundIllustration from '/public/assets/svg/playground.svg'

import { useModalContext } from '@/v3/presentation/components/Modal'
import { NEW_ROUTES } from '@/constants/routes'

export const RegistrationModal = () => {
  const { handleModal } = useModalContext()
  const router = useRouter()

  const handleConfirm = () => {
    handleModal()
  }

  const handleClose = () => {
    router.push(NEW_ROUTES.UNAUTHENTICATED.REGISTRATION.path)
    handleModal()
  }

  const title = (
    <Box display='inline'>
      {[
        { text: 'Você tem ', color: 'inherit' },
        { text: 'dependentes ', color: 'primary' },
        { text: 'ou ', color: 'inherit' },
        { text: 'trabalha ', color: 'primary' },
        { text: 'em alguma instituição parceira da Coala?', color: 'inherit' },
      ].map(({ text, color }, index) => (
        <Typography key={index} variant='h1' component='span' color={color}>
          {text}
        </Typography>
      ))}
    </Box>
  )

  return (
    <Experimental_CVerticalModal
      title={title}
      illustration={<PlaygroundIllustration />}
      primaryButtonLabel='Sim :)'
      secondaryButtonLabel='Não, mas quero conhecer!'
      onPrimaryButtonClick={handleConfirm}
      onSecondaryButtonClick={handleClose}
    />
  )
}
