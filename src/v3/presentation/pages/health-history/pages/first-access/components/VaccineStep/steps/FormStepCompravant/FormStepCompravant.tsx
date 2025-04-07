import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined'
import { Typography } from '@mui/material'

import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { useLoadingFeedback } from '@/v3/presentation/hooks/useLoadingFeedback'
import { IVaccineDosageForm } from '@/v3/presentation/pages/health-history/hooks/useVaccineControl'

import { StackListFormContainer } from '../../../../../../components/StackListFormContainer'
import { BaseFormStepProps } from '../../../../types'

export type FormStepCompravantProps = Omit<BaseFormStepProps, 'onSkip'> & {
  onAdd: () => void
  comprovants: IVaccineDosageForm[]
  onEdit: (comprovant: IVaccineDosageForm, index: number) => void
  onSkip: () => Promise<void>
}

export const FormStepCompravant = ({
  onEdit,
  onConfirm,
  onAdd,
  onSkip,
  comprovants,
}: FormStepCompravantProps) => {
  const { nextStep } = useCWizardUrlControlContext()
  const { execute: executeConfirm, isLoading } = useLoadingFeedback(onConfirm)
  const { execute: executeSkip, isLoading: isLoadingSkip } = useLoadingFeedback(onSkip)

  const handleAdd = () => {
    onAdd()
    nextStep?.()
  }

  const handleEdit = (prescription: IVaccineDosageForm, index: number) => {
    onEdit(prescription, index)
    nextStep?.()
  }

  function getSubText(comprovant: IVaccineDosageForm) {
    const num = `${comprovant.vaccines.length}`.padStart(2, '0')

    return `(${num}) vacinas`
  }

  const disabledButton = comprovants.length === 0 || isLoading

  return (
    <>
      <CBaseContainer
        mt={spacing(2)}
        boxShadow='none'
        buttonLabel='Próximo'
        cancelLabel='Cadastrar depois'
        onCancel={executeSkip}
        isLoading={isLoading || isLoadingSkip}
        buttonDisabled={disabledButton}
        onConfirm={executeConfirm}
      >
        <Typography variant='h5' fontWeight='600' mb={spacing(2)}>
          Cadastro de comprovante de vacinação
        </Typography>
        <StackListFormContainer
          data={comprovants}
          onHideItem={(data) => !data.completed}
          getSubText={getSubText}
          getText={(_, index) => `Receita ${index + 1}`}
          icon={<MedicationOutlinedIcon />}
          onAdd={handleAdd}
          onEdit={handleEdit}
          addButtonText='Comprovante'
          emptyText='Não há comprovantes cadastrados'
          title='Adicione aqui os comprovantes de vacinação:'
        />
      </CBaseContainer>
    </>
  )
}
