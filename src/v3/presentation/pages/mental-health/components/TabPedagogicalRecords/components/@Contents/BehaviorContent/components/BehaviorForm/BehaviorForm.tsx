import { Stack } from '@mui/material'

import { BehaviorType } from '@/v3/domain/@v2/mental-health/enums/behavior-type.enum'
import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'
import { CButtonGroupControlled } from '@/v3/presentation/newComponents/implementations/form/CButtonGroupControlled/CButtonGroupControlled'

import { FormContainer } from '../../../components/FormContainer/FormContainer'
import { FormInputLabel } from '../../../components/FormInputLabel/FormInputLabel'

type Props = {
  onAdd?: () => void
  onDelete?: () => void
  prefix?: string
  isEdit?: boolean
}

export const BehaviorForm = ({ prefix = '', onAdd, onDelete, isEdit }: Props) => {
  const title = onAdd ? 'Adicionar comportamento' : 'Editar comportamento'

  return (
    <Stack spacing={2} maxWidth={650}>
      <CButtonGroupControlled
        name={`${prefix}type`}
        disabled={isEdit}
        options={[
          { label: 'Emocional', value: BehaviorType.EMOTIONAL },
          { label: 'Desafiador', value: BehaviorType.CHALLENGING },
        ]}
      />

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
          text='Gatilho'
          input={
            <CInputControlled
              label=''
              sx={{ mb: 1.5 }}
              name={prefix + 'trigger'}
              placeholder='Descreva o gatilho para o determinado comportamento'
              fullWidth
            />
          }
        />
        <FormInputLabel
          text='Descrição do comportamento'
          input={
            <CTextAreaControlled
              label=''
              name={prefix + 'description'}
              placeholder='Descreva de forma detalhada o que foi observado'
              fullWidth
            />
          }
        />
      </FormContainer>
    </Stack>
  )
}
