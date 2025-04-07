import { Button } from '@mui/material'

import { useModalContext } from '@/v3/presentation/components/Modal'

import { StyledButtonWrapper, StyledModalWrapper } from './styles'
interface CancelSessionModalProps {
  handleSubmit: () => void
}
export const CancelSessionModal = ({ handleSubmit }: CancelSessionModalProps) => {
  const { handleModal } = useModalContext()

  return (
    <StyledModalWrapper>
      <h1>Tem certeza que deseja cancelar essa sessão?</h1>
      <StyledButtonWrapper>
        <Button onClick={() => handleSubmit()}>Sim</Button>
        <Button variant='outlined' onClick={() => handleModal()}>
          Não
        </Button>
      </StyledButtonWrapper>
    </StyledModalWrapper>
  )
}
