import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'

import { FormContainer } from '../../../../../components/FormContainer/FormContainer'
import { FormInputLabel } from '../../../../../components/FormInputLabel/FormInputLabel'

export const OthersForm = ({
  onAdd,
  onDelete,
  prefix = '',
}: {
  onAdd?: () => void
  onDelete?: () => void
  prefix?: string
}) => {
  return (
    <FormContainer title='Outro tipo de interesse' onAdd={onAdd} onDelete={onDelete}>
      <FormInputLabel
        text='Título'
        input={
          <CInputControlled
            sx={{ mb: 1.5 }}
            label=''
            name={prefix + 'title'}
            placeholder='Digite aqui'
            fullWidth
          />
        }
      />

      <FormInputLabel
        text='Tipo de interesse '
        input={
          <CTextAreaControlled
            label=''
            name={prefix + 'observation'}
            placeholder='Descreva aqui o interesse'
            fullWidth
          />
        }
      />
    </FormContainer>
  )
}
