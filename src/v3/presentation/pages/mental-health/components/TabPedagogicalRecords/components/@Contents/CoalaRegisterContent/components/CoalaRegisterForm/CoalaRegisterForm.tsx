import { Stack } from '@mui/material'

import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'
import { CFileInputAsyncControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputAsyncControlled'

import { FormContainer } from '../../../components/FormContainer/FormContainer'
import { FormInputLabel } from '../../../components/FormInputLabel/FormInputLabel'

type Props = {
  onAdd?: () => void
  onDelete?: () => void
  prefix?: string
  onUpload: (file: File) => Promise<number>
}

export const CoalaRegisterForm = ({ prefix = '', onUpload, onAdd, onDelete }: Props) => {
  const title = onAdd ? 'Adicionar registro da Coala' : 'Editar registro da Coala'

  return (
    <Stack maxWidth={650}>
      <FormContainer title={title} onAdd={onAdd} onDelete={onDelete}>
        <FormInputLabel
          text='Título*'
          input={
            <CInputControlled
              label=''
              sx={{ mb: 1.5 }}
              name={prefix + 'title'}
              placeholder='Digite aqui'
              fullWidth
            />
          }
        />

        <FormInputLabel
          text='Descrição do registro*'
          input={
            <CTextAreaControlled
              label=''
              sx={{ mb: 1.5 }}
              name={prefix + 'description'}
              placeholder='Descreva o que deseja registrar'
              fullWidth
            />
          }
        />
        <FormInputLabel
          text='Arquivo'
          input={
            <CFileInputAsyncControlled
              name={prefix + 'document'}
              placeholder='Selecione um arquivo '
              label=''
              accept='.pdf, image/*'
              onUploadFunc={onUpload}
            />
          }
        />
      </FormContainer>
    </Stack>
  )
}
