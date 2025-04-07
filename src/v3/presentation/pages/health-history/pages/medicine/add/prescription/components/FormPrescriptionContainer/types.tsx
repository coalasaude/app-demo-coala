import { IPrescriptionMedicineFormFields } from '@/v3/presentation/pages/health-history/components/FormPrescriptionMedicine/schema'

export interface FormPrescriptionContainerProps {
  onEdit: (prescription: IPrescriptionMedicineFormFields, index: number) => void;
  onAdd: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  prescriptions: IPrescriptionMedicineFormFields[];
}
