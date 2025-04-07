import { Box } from '@mui/material'

import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'

import { FormContainer } from '../../../components/FormContainer/FormContainer'
import { FormInputLabel } from '../../../components/FormInputLabel/FormInputLabel'

type Props = {
  onAdd?: () => void
  onDelete?: () => void
  prefix?: string
}

export const DifficultiesForm = ({ prefix = '', onAdd, onDelete }: Props) => {
  const title = onAdd ? 'Adicionar dificuldade ou desafio' : 'Editar dificuldade ou desafio'
  return (
    <Box maxWidth={650}>
      <FormContainer title={title} onAdd={onAdd} onDelete={onDelete}>
        <FormInputLabel
          text='Escreva um nome para a dificuldade ou desafio*'
          input={
            <CInputControlled
              sx={{ mb: 1.5 }}
              label=''
              name={prefix + 'name'}
              placeholder='Digite aqui'
              fullWidth
            />
          }
        />

        <FormInputLabel
          text='Descrição da dificuldade ou desafio*'
          input={
            <CTextAreaControlled
              label=''
              name={prefix + 'description'}
              placeholder='Descreva o desafio'
              fullWidth
            />
          }
        />
      </FormContainer>
    </Box>
  )
}
