import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { CTextAreaControlled } from '@/v3/presentation/newComponents'
import { GridItem, GridWrapper } from '@/components/Grid'
import CInputLabel from '@/v3/presentation/newComponents/atoms/CInputLabel/CInputLabel'

interface FormActivitiesStepProps {
  onBackStep: () => void
  isEdit?: boolean
  isLoading?: boolean
}

const FormActivitiesStep = ({ onBackStep, isEdit, isLoading }: FormActivitiesStepProps) => {
  return (
    <>
      <GridWrapper mt={2}>
        <GridItem xs={12}>
          <CInputLabel title='Atividade proposta' />
          <CTextAreaControlled
            name='activities'
            label=''
            placeholder='Digite as atividades propostas'
            fullWidth
          />
        </GridItem>
        <GridItem xs={12}>
          <CInputLabel title='Adaptações curriculares' />
          <CTextAreaControlled
            name='adaptations'
            label=''
            placeholder='Digite as adaptações curriculares'
            fullWidth
          />
        </GridItem>
        <GridItem xs={12}>
          <CInputLabel title='Tecnologias de apoio' />
          <CTextAreaControlled
            name='supportTechnologies'
            label=''
            placeholder='Digite as tecnologias de apoio'
            fullWidth
          />
        </GridItem>
        <GridItem xs={12}>
          <CInputLabel title='Avaliação e meta' />
          <CTextAreaControlled
            name='assessment'
            label=''
            placeholder='Digite a forma de avaliação e metas'
            fullWidth
          />
        </GridItem>
      </GridWrapper>
      <FormButtons
        mt={3}
        isLoading={isLoading}
        justifyContent='flex-end'
        minWidth='120px'
        confirmLabel={isEdit ? 'Salvar' : 'Criar'}
        cancelLabel='Voltar'
        cancelVariant='outlined'
        onCancel={onBackStep}
        buttonFlex
      />
    </>
  )
}

export default FormActivitiesStep
