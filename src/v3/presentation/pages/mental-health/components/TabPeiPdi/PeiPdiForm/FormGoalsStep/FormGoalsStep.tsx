import dayjs from 'dayjs'
import { get } from 'lodash'
import { useFormContext } from 'react-hook-form'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

import { CDatePickerControlled } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'
import CInputLabel from '@/v3/presentation/newComponents/atoms/CInputLabel/CInputLabel'

interface FormGoalsStepProps {
  onBackStep: () => void
  isEdit?: boolean
  isLoading?: boolean
  canCreateAi: boolean
  patientBirthday?: boolean
}

const FormGoalsStep = ({
  onBackStep,
  isEdit,
  isLoading,
  patientBirthday,
  canCreateAi,
}: FormGoalsStepProps) => {
  const {
    formState: { errors },
    watch,
  } = useFormContext()

  const birthday = watch('patientBirthday')
  const disableAgeInput = birthday

  return (
    <>
      <GridWrapper mt={2}>
        <GridItem xs={12} md={6}>
          <CInputLabel title='Data de nascimento' />
          <CDatePickerControlled
            name='patientBirthday'
            label=''
            maxDate={dayjs()}
            disabled={patientBirthday}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CInputLabel title='Idade' />
          <CInputControlled
            name='patientAge'
            label=''
            placeholder='Idade'
            fullWidth
            error
            disabled={patientBirthday || disableAgeInput}
          />
        </GridItem>
        <GridItem xs={12}>
          <CInputLabel title='Possíveis condições ou suspeitas' />
          <CTextAreaControlled
            name='conditionSuspicions'
            label=''
            placeholder='Descreva se o aluno tem alguma condição de saúde ou suspeita. Ex: TDAH, TOD, TEA e etc.'
            fullWidth
          />
        </GridItem>
        <GridItem xs={12}>
          <CInputLabel title='Dificuldades*' error={!!get(errors, 'difficulties')} />
          <CTextAreaControlled
            name='difficulties'
            label=''
            placeholder='Descreva as principais dificuldades do aluno'
            fullWidth
            error={!!get(errors, 'difficulties')}
          />
        </GridItem>
        <GridItem xs={12}>
          <CInputLabel title='Objetivos gerais*' error={!!get(errors, 'generalObjectives')} />
          <CTextAreaControlled
            name='generalObjectives'
            label=''
            placeholder='Descreva brevemente os objetivos do plano'
            fullWidth
            error={!!get(errors, 'generalObjectives')}
          />
        </GridItem>
      </GridWrapper>
      <FormButtons
        mt={3}
        isLoading={isLoading}
        justifyContent='flex-end'
        minWidth='120px'
        confirmLabel={isEdit ? 'Salvar' : canCreateAi ? 'Criar com IA' : 'Criar'}
        cancelLabel='Voltar'
        cancelVariant='outlined'
        onCancel={onBackStep}
        startIcon={isEdit ? null : canCreateAi ? <AutoAwesomeIcon /> : null}
        confirmButtonProps={{ minWidth: '155px' }}
        buttonFlex
      />
    </>
  )
}

export default FormGoalsStep
