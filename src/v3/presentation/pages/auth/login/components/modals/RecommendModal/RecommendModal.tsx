import { Experimental_CVerticalModal } from '@/v3/presentation/newComponents/layout/Experimental_CVerticalModal'
import { WebViewManager } from '@/services/WebView'

import PlaygroundIllustration from '/public/assets/svg/playground.svg'

import { useModalContext } from '@/v3/presentation/components/Modal'

export const RecommendModal = () => {
  const { handleModal } = useModalContext()

  const handleConfirm = () => {
    WebViewManager.open(process.env.NEXT_PUBLIC_COALA_FORM_URL, '_blank')
    handleModal()
  }

  const handleClose = () => {
    handleModal()
  }

  return (
    <Experimental_CVerticalModal
      title='Então você ainda não teve acesso ao nosso abracinho de Coala?'
      illustration={<PlaygroundIllustration />}
      primaryButtonLabel={'Quero indicar!'}
      onPrimaryButtonClick={handleConfirm}
      onSecondaryButtonClick={handleClose}
    />
  )
}
