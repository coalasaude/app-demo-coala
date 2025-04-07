import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined'

import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useCWizard } from '@/v3/presentation/hooks/useCWizard'
import { IPrescriptionMedicineFormFields } from '@/v3/presentation/pages/health-history/components/FormPrescriptionMedicine/schema'
import { CContainerContent, PageHeader } from '@/v3/presentation/newComponents'

import { StackListFormContainer } from '../../../../../../components/StackListFormContainer'

import { FormPrescriptionContainerProps } from './types'

export const FormPrescriptionContainer = ({
  onEdit,
  onAdd,
  prescriptions,
  onSubmit,
  isLoading,
}: FormPrescriptionContainerProps) => {
  const { nextStep } = useCWizard()

  const handleAdd = () => {
    onAdd()
    nextStep()
  }

  const handleEdit = (prescription: IPrescriptionMedicineFormFields, index: number) => {
    onEdit(prescription, index)
    nextStep()
  }

  const getSubText = (prescription: IPrescriptionMedicineFormFields) => {
    const numMedicines = `${prescription.medicines.length}`.padStart(2, '0')

    return `(${numMedicines}) medicamentos`
  }

  const disabledButton = prescriptions.length === 0 || isLoading

  return (
    <>
      <PageHeader title='Cadastro de medicamentos' />
      <CBaseContainer
        mt={spacing(2)}
        buttonLabel='Cadastrar'
        isLoading={isLoading}
        onConfirm={onSubmit}
        buttonDisabled={disabledButton}
      >
        <CContainerContent title='Receitas'>
          <StackListFormContainer
            data={prescriptions}
            onEdit={handleEdit}
            getSubText={getSubText}
            getText={(_, index) => `Receita ${index + 1}`}
            icon={<MedicationOutlinedIcon />}
            onAdd={handleAdd}
            addButtonText='Nova receita'
            emptyText='Não há receitas cadastradas'
            title=''
          />
        </CContainerContent>
      </CBaseContainer>
    </>
  )
}
