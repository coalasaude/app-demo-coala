export interface IMedicineFormProps {
  concentrationUnitOptions: { value: number; label: string }[]
  dosageUnitOptions: { value: number; label: string }[]
  scheduledMedicineOptions: { value: number; label: string }[]
  prefixName?: string
  handleAsyncUpload: (file: File) => Promise<number>
}
