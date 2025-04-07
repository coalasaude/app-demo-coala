import { Experimental_CVerticalModal } from '@/v3/presentation/newComponents/layout/Experimental_CVerticalModal'

import PlaygroundIllustration from '/public/assets/svg/playground.svg'

import { useModalContext } from '@/v3/presentation/components/Modal'

import { WhatsAppButton } from './WhatsAppButton'

export const WhatsAppModal = () => {
  const { handleModal } = useModalContext()

  const handleClose = () => {
    handleModal()
  }

  return (
    <Experimental_CVerticalModal
      title='Ops, Nenhum cadastro foi identificado no nosso sistema!'
      illustration={<PlaygroundIllustration />}
      primaryButton={<WhatsAppButton />}
      onSecondaryButtonClick={handleClose}
    />
  )
}
