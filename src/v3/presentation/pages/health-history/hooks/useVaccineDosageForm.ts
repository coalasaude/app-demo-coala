import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { DefaultValues, useForm } from 'react-hook-form'

import { useFetchBrowseVaccineOptions } from '@/v3/presentation/hooks/api/@v2/health-history/vaccine/useFetchBrowseVaccineOptions'

import {
  IVaccineDosageFormFields,
  initialVaccineDosageValues,
  schemaVaccineDosage,
} from '../components/FormVacineDosage/schema'

export const useVaccineDosageForm = ({
  defaultValue = initialVaccineDosageValues,
}: {
  defaultValue?: DefaultValues<IVaccineDosageFormFields>
  userId?: number
}) => {
  const router = useRouter()
  const selectedUserId = Number(router.query.userId as string)
  const { vaccines, isPending: isLoading } = useFetchBrowseVaccineOptions({
    userId: selectedUserId,
  })

  const vaccineOptions =
    vaccines?.data?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) || []

  const form = useForm({
    resolver: yupResolver(schemaVaccineDosage),
    defaultValues: defaultValue as IVaccineDosageFormFields,
  })

  return {
    form,
    isLoading,
    vaccineOptions,
  }
}
