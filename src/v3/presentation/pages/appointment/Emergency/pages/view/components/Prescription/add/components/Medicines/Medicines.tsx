import { useFieldArray, useFormContext } from 'react-hook-form'
import { Box, Button } from '@mui/material'
import * as yup from 'yup'

import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { MedicineForm } from '@/components/MedicineForm'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useFetchReadMedicineOptions } from '@/v3/presentation/hooks/api/@v2/health-history/medicine/useFetchReadMedicineOptions'

import { AddedMedicineTable } from '../AddedMedicineTable'

import { schemaMedicine } from './schema'

export const Medicines = ({ error, prescription }: { error: any; prescription?: boolean }) => {
  const auth = useAuth()
  const userId = Number(auth?.user?.id)
  const { control, setError, clearErrors, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medicine',
  })
  const medicine = watch('medicine')
  const { data, isLoading: isLoadingMedicineOptions } = useFetchReadMedicineOptions({
    userId,
  })

  const add = (validate = false) => {
    try {
      if (validate) {
        schemaMedicine.validateSync(medicine[medicine.length - 1], {
          abortEarly: false,
        })
      }

      append({
        name: '',
        concentration: '',
        medicine_concentration_unit_id: '',
        dosage: '',
        medicine_dosage_unit_id: '',
        scheduled_medicine_id: '',
        start_date: null,
        start_hour: '',
        valid_until: '',
        recommendation: '',
        observation: '',
        continuous_usage: 'false',
        use_if_necessary: 'false',
      })
    } catch (e) {
      clearErrors()
      const formatted = (e as yup.ValidationError).inner.map((data) => {
        if (!data.path) return
        setError(`medicine.${fields.length - 1}.${data.path}`, { message: data.errors[0] })
      })
      return formatted
    }
  }

  if (fields.length === 0) {
    add()
  }

  if (isLoadingMedicineOptions) {
    return <ViewSkeleton tableSize={0} />
  }

  if (!data) return null

  return (
    <>
      {fields.map((field, i) => {
        if (i < fields.length - 1) return
        return (
          <Box
            key={field.id}
            style={{
              padding: 0,
              paddingTop: 8,
              maxWidth: '100%',
            }}
          >
            <MedicineForm
              index={fields.length - 1}
              error={error}
              prescription={prescription}
              concentrationUnitOptions={
                data?.concentrationUnit?.map(({ id, name }) => ({
                  value: id,
                  label: name,
                })) || []
              }
              dosageUnitOptions={
                data?.dosageUnit?.map(({ id, name }) => ({
                  value: id,
                  label: name,
                })) || []
              }
              scheduledMedicineOptions={
                data?.scheduledMedicine?.map(({ id, name }) => ({
                  value: id,
                  label: name,
                })) || []
              }
              basename={`medicine[${fields.length - 1}].`}
            />
          </Box>
        )
      })}
      <Box display='flex' justifyContent='end' my={2}>
        <Button variant='outlined' onClick={() => add(true)} sx={{ px: 3 }}>
          Adicionar
        </Button>
      </Box>
      <Box pb={5}>
        <AddedMedicineTable data={data} fields={fields} remove={remove} />
      </Box>
    </>
  )
}

export default Medicines
