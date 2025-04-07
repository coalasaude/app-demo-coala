import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined'
import { Typography } from '@mui/material'

import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { useLoadingFeedback } from '@/v3/presentation/hooks/useLoadingFeedback'
import { IPrescriptionMedicineFormFields } from '@/v3/presentation/pages/health-history/components/FormPrescriptionMedicine/schema'

import { StackListFormContainer } from '../../../../../../components/StackListFormContainer'
import { BaseFormStepProps } from '../../../../types'

export type FormStepPrescriptionProps = Omit<BaseFormStepProps, 'onSkip'> & {
  onEdit: (prescription: IPrescriptionMedicineFormFields, index: number) => void
  onSkip: () => Promise<void>
  onAdd: () => void
  prescriptions: IPrescriptionMedicineFormFields[]
}

export const FormStepPrescription = ({
  onConfirm,
  onEdit,
  onAdd,
  onSkip,
  prescriptions,
}: FormStepPrescriptionProps) => {
  const { nextStep } = useCWizardUrlControlContext()
  const { execute: executeConfirm, isLoading } = useLoadingFeedback(onConfirm)
  const { execute: executeSkip, isLoading: isLoadingSkip } = useLoadingFeedback(onSkip)

  const handleAdd = () => {
    onAdd()
    nextStep?.()
  }

  const handleEdit = (prescription: IPrescriptionMedicineFormFields, index: number) => {
    onEdit(prescription, index)
    nextStep?.()
  }

  const getSubText = (prescription: IPrescriptionMedicineFormFields) => {
    const numMedicines = `${prescription.medicines.length}`.padStart(2, '0')

    return `(${numMedicines}) medicamentos`
  }

  const disabledButton = prescriptions.length === 0 || isLoading || isLoadingSkip

  return (
    <>
      <CBaseContainer
        mt={spacing(2)}
        boxShadow='none'
        buttonLabel='Próximo'
        isLoading={isLoading || isLoadingSkip}
        cancelLabel='Cadastrar depois'
        onCancel={executeSkip}
        onConfirm={executeConfirm}
        buttonDisabled={disabledButton}
      >
        <Typography variant='h5' fontWeight='600'>
          Cadastro de receitas de medicamentos:
        </Typography>
        <StackListFormContainer
          data={prescriptions}
          onEdit={handleEdit}
          getSubText={getSubText}
          getText={(_, index) => `Receita ${index + 1}`}
          icon={<MedicationOutlinedIcon />}
          onAdd={handleAdd}
          addButtonText='Nova receita'
          emptyText='Não há receitas cadastradas '
          title='Adicione as receitas aqui:'
        />
      </CBaseContainer>
    </>
  )
}
