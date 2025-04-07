import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CAccordion, CAccordionBody } from '@/v3/presentation/newComponents'
import { CFileInputAsyncControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputAsyncControlled'
import { IMedicineFormFields } from '@/v3/presentation/pages/health-history/components/FormMedicine/schema'
import { MedicineModel } from '@/v3/domain/@v2/health-history/medicine/medicine.model'

import { DeleteIconButton } from '../../../../../components/DeleteIconButton'
import { FormMedicine } from '../../../../../components/FormMedicine'
import { schemaOneMedicine } from '../../../../../components/FormMedicine/schema'

export const FormMedicineContainer = ({
  medicine,
  concentrationUnitOptions,
  dosageUnitOptions,
  scheduledMedicineOptions,
  handleAsyncUploadMedicine,
  handleAsyncUploadPrescription,
  onRemove,
  onCancel,
  onSubmit,
  isLoading,
}: {
  medicine: MedicineModel
  concentrationUnitOptions: { value: number; label: string }[]
  dosageUnitOptions: { value: number; label: string }[]
  scheduledMedicineOptions: { value: number; label: string }[]
  onRemove: () => void
  onCancel: () => void
  onSubmit: SubmitHandler<IMedicineFormFields>
  isLoading?: boolean
  handleAsyncUploadMedicine: (file: File) => Promise<number>
  handleAsyncUploadPrescription: (file: File) => Promise<number>
}) => {
  const form = useForm({
    resolver: yupResolver(schemaOneMedicine),
    defaultValues: {
      name: medicine?.name,
      concentration: medicine?.concentration,
      medicineConcentrationUnitId: medicine?.medicineConcentrationUnit?.id,
      dosage: medicine?.dosage,
      medicineDosageUnitId: medicine?.medicineDosageUnit?.id,
      scheduledMedicineId: medicine?.scheduledMedicine?.id,
      observation: medicine?.observation || '',
      recommendation: medicine?.recommendation || '',
      treatmentDays: medicine?.getTreatmentsDays(),
      startHour: medicine?.getHourDate(),
      startDate: medicine?.startDate as unknown as Date,
      isSos: !!medicine?.isSOS,
      isContinuousUsage: !!medicine?.isContinuousUsage,
      packagePhoto: { name: medicine?.getPackagePhoto()?.name },
      prescriptionFile: { name: medicine?.getPrescriptionFile()?.name },
      authorizationStatus: medicine?.authorizationStatus,
    },
  })

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <CBaseContainer
        mt={spacing(2)}
        title='Dados do medicamento'
        buttonLabel='Salvar'
        onCancel={onCancel}
        isLoading={isLoading}
        cancelLabel='Cancelar'
        buttonDisabled={!form.formState.isDirty}
      >
        <Box mt={spacing(3)}>
          <Typography variant='body1' mb={spacing(2)}>
            Faça anexo da receita médica:
          </Typography>
          <GridWrapper spacing={spacing(3)} mb={spacing(3)}>
            <GridItem xs={12} md={6}>
              <CFileInputAsyncControlled
                label='Selecione receita médica*'
                accept='.pdf, image/*'
                name={'prescriptionFile'}
                onUploadFunc={handleAsyncUploadPrescription}
              />
            </GridItem>
          </GridWrapper>

          <CAccordion expanded={true} title={medicine.name || ''}>
            <CAccordionBody secondaryButton={<DeleteIconButton onDelete={onRemove} />}>
              <Box mt={spacing(2)}>
                <FormMedicine
                  concentrationUnitOptions={concentrationUnitOptions}
                  dosageUnitOptions={dosageUnitOptions}
                  scheduledMedicineOptions={scheduledMedicineOptions}
                  handleAsyncUpload={handleAsyncUploadMedicine}
                />
              </Box>
            </CAccordionBody>
          </CAccordion>
        </Box>
      </CBaseContainer>
    </CForm>
  )
}
