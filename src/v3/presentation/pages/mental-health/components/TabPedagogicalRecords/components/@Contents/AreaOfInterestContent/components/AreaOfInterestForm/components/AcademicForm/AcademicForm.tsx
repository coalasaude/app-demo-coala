import { CTextAreaControlled } from '@/v3/presentation/newComponents'

import { FormInputLabel } from '../../../../../components/FormInputLabel/FormInputLabel'
import { SubjectSelectInputForm } from '../../../SubjectSelectInputForm/SubjectSelectInputForm'
import { FormContainer } from '../../../../../components/FormContainer/FormContainer'

export const AcademicForm = ({
  onAdd,
  onDelete,
  prefix = '',
}: {
  onAdd?: () => void
  onDelete?: () => void
  prefix?: string
}) => {
  return (
    <FormContainer title='Acadêmico' onAdd={onAdd} onDelete={onDelete}>
      <FormInputLabel
        text='Disciplinas de interesse do aluno*'
        input={
          <SubjectSelectInputForm
            name={prefix + 'interestSubjectIds'}
            placeholder='Selecione as disciplinas'
          />
        }
      />

      <FormInputLabel
        text='Disciplinas em que o aluno demonstra facilidade'
        input={
          <SubjectSelectInputForm
            name={prefix + 'proficientSubjectIds'}
            placeholder='Selecione as disciplinas'
          />
        }
      />
      <FormInputLabel
        text='Observações'
        input={
          <CTextAreaControlled
            label=''
            name={prefix + 'observation'}
            placeholder='Digite aqui'
            fullWidth
          />
        }
      />
    </FormContainer>
  )
}
