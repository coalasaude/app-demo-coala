import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutateAddHealthInsurance } from '@/v3/presentation/hooks/api/@v2/users/health-insurance/useMutateAddHealthInsurance'

import { IHealthInsuranceFormFields, schemaHealthInsurance } from '../schema'

export const useFormAddHealthInsurance = ({ userId }: { userId?: number }) => {
  const addProfessionalReference = useMutateAddHealthInsurance()

  const form = useForm({
    resolver: yupResolver(schemaHealthInsurance),
    defaultValues: {
      validUntil: null,
    } as unknown as IHealthInsuranceFormFields,
  })

  const onCreateHealthInsurance: SubmitHandler<IHealthInsuranceFormFields> = async (body) => {
    if (userId) {
      await addProfessionalReference.mutateAsync({
        userId: userId,
        code: body.code,
        insuranceCompany: body.insuranceCompany,
        plan: body.plan,
        validUntil: body.validUntil,
        file: body.document,
      })
    }
  }

  return {
    onCreateHealthInsurance,
    isLoadingCreateHealthInsurance: addProfessionalReference.isPending,
    form,
  }
}
