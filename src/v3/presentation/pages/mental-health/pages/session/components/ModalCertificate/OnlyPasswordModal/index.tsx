import { Button } from '@mui/material'

import { CButton, CInputControlled } from '@/v3/presentation/newComponents'

import { ModalCertificateProps } from '..'

import { StyledButtonWrapper, StyledCloseIcon, StyledDialog, StyledInputWrapper } from './styles'

export const OnlyPasswordModal = ({
  open,
  onClose,
  isLoading,
  handleSubmit,
  isSubmitButtonDisabled,
}: ModalCertificateProps) => {
  return (
    <StyledDialog open={!!open} onClose={onClose} maxWidth={false}>
      <StyledCloseIcon
        className='cursor-pointer'
        onClick={onClose}
        fontSize='large'
        sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
      />
      <h1>Senha do certificado digital</h1>
      <StyledInputWrapper>
        <CInputControlled
          placeholder='Digite sua senha'
          name='certificatePass'
          variant='outlined'
          inputType='password'
          rules={{ required: true }}
          type='password'
          label='Digite sua senha'
          fullWidth
        />
      </StyledInputWrapper>
      <StyledButtonWrapper>
        <Button variant='outlined' onClick={onClose}>
          Cancelar
        </Button>
        <CButton
          loading={isLoading}
          onClick={() => handleSubmit()}
          disabled={isSubmitButtonDisabled}
        >
          Adicionar
        </CButton>
      </StyledButtonWrapper>
    </StyledDialog>
  )
}
