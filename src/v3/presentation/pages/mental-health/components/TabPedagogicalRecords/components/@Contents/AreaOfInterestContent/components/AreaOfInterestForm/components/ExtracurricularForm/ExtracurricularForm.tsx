import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'

import { FormContainer } from '../../../../../components/FormContainer/FormContainer'
import { FormInputLabel } from '../../../../../components/FormInputLabel/FormInputLabel'

export const ExtracurricularForm = ({
  onAdd,
  onDelete,
  prefix = '',
}: {
  onAdd?: () => void
  onDelete?: () => void
  prefix?: string
}) => {
  return (
    <FormContainer title='Extracurricular' onAdd={onAdd} onDelete={onDelete}>
      <FormInputLabel
        text='Atividades extracurriculares que o aluno demonstra interesse'
        input={
          <CInputControlled
            label=''
            sx={{ mb: 1.5 }}
            name={prefix + 'interests'}
            placeholder='Digite aqui'
            fullWidth
          />
        }
      />
      <FormInputLabel
        text='Atividades realizadas fora da escola (hobbies ou projetos pessoais)'
        input={
          <CInputControlled
            sx={{ mb: 1.5 }}
            label=''
            name={prefix + 'proficients'}
            placeholder='Digite aqui'
            fullWidth
          />
        }
      />

      <FormInputLabel
        text='Observações'
        input={
          <CTextAreaControlled
            label=''
            name={prefix + 'observation'}
            placeholder='Observações'
            fullWidth
          />
        }
      />
    </FormContainer>
  )
}
