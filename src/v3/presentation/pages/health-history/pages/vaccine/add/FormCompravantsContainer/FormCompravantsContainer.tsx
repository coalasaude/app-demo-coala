import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined'

import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useCWizard } from '@/v3/presentation/hooks/useCWizard'
import { CContainerContent, PageHeader } from '@/v3/presentation/newComponents'

import { IVaccineDosageForm } from '../../../../hooks/useVaccineControl'
import { StackListFormContainer } from '../../../../components/StackListFormContainer'

import { FormCompravantContainerProps } from './types'

export const FormCompravantsContainer = ({
  onAdd,
  comprovants,
  onSubmit,
  isLoading,
  onEdit,
}: FormCompravantContainerProps) => {
  const { nextStep } = useCWizard()

  const handleAdd = () => {
    onAdd()
    nextStep()
  }

  const handleEdit = (prescription: IVaccineDosageForm, index: number) => {
    onEdit(prescription, index)
    nextStep()
  }

  function getSubText(comprovant: IVaccineDosageForm) {
    const num = `${comprovant.vaccines.length}`.padStart(2, '0')

    return `(${num}) vacinas`
  }

  const disabledButton = comprovants.length === 0 || isLoading

  return (
    <>
      <PageHeader title='Cadastro de comprovante de vacinação' />
      <CBaseContainer
        buttonLabel='Cadastrar'
        isLoading={isLoading}
        onConfirm={onSubmit}
        buttonDisabled={disabledButton}
      >
        <CContainerContent title='Comprovantes de vacinação'>
          <StackListFormContainer
            data={comprovants}
            onHideItem={(data) => !data.completed}
            getSubText={getSubText}
            onEdit={handleEdit}
            getText={(_, index) => `Comprovante ${String(index + 1).padStart(2, '0')}`}
            icon={<MedicationOutlinedIcon />}
            onAdd={handleAdd}
            addButtonText='Comprovante'
            emptyText='Não existe comprovante de vacinação cadastrado'
            title=''
          />
        </CContainerContent>
      </CBaseContainer>
    </>
  )
}
