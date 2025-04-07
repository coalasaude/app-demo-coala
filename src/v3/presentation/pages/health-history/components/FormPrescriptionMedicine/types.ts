export interface IMedicinePrescriptionFormProps {
  concentrationUnitOptions: { value: number; label: string }[]
  dosageUnitOptions: { value: number; label: string }[]
  scheduledMedicineOptions: { value: number; label: string }[]
  handleAsyncUploadMedicine: (file: File) => Promise<number>
  handleAsyncUploadPrescription: (file: File) => Promise<number>
}
