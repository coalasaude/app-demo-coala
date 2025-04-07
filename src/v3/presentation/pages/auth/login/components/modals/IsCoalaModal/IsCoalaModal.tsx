import { Typography } from '@mui/material'

import PlaygroundIllustration from '/public/assets/svg/playground.svg'

import { useRouter } from 'next/router'

import { Experimental_CVerticalModal } from '@/v3/presentation/newComponents/layout/Experimental_CVerticalModal'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { NEW_ROUTES } from '@/constants/routes'

interface IsCoalaModalProps {
  onConfirm: () => void
  onClose: () => void
}

export const IsCoalaModal = (props: IsCoalaModalProps) => {
  const { handleModal } = useModalContext()
  const router = useRouter()

  const handleConfirm = () => {
    props.onConfirm()
    handleModal()
  }

  const handleClose = () => {
    router.push(NEW_ROUTES.UNAUTHENTICATED.REGISTRATION.path)
    props.onClose()
  }

  return (
    <Experimental_CVerticalModal
      title={
        <Typography variant='h1'>
          Você tem{' '}
          <Typography variant='h1' component='span' color={(theme) => theme.palette.primary.main}>
            dependentes
          </Typography>{' '}
          ou{' '}
          <Typography variant='h1' component='span' color={(theme) => theme.palette.primary.main}>
            trabalha
          </Typography>{' '}
          em alguma instituição parceira da Coala?
        </Typography>
      }
      illustration={<PlaygroundIllustration />}
      primaryButtonLabel='Sim :)'
      onPrimaryButtonClick={handleConfirm}
      secondaryButtonLabel='Não, mas quero conhecer!'
      onSecondaryButtonClick={handleClose}
    />
  )
}
