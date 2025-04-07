import { IVaccineDosageForm } from '../../../../hooks/useVaccineControl'

export interface FormCompravantContainerProps {
  onAdd: () => void
  onSubmit: () => void
  isLoading?: boolean
  comprovants: IVaccineDosageForm[]
  onEdit: (comprovant: IVaccineDosageForm, index: number) => void;
}
