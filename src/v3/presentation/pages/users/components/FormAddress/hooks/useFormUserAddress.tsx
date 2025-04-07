import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useFetchReadAddress } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadAddress'
import { useMutateAddAddress } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateAddAddress'

import { IAddressFormFields, schemaAddress } from '../schema'

export const useFormEditAddress = ({ userId }: { userId: number }) => {
  const { address, isLoading } = useFetchReadAddress({ userId: userId })
  const { mutateAsync, isPending } = useMutateAddAddress()

  const form = useForm({
    resolver: yupResolver(schemaAddress),
  })

  const onUpdateAddress: SubmitHandler<IAddressFormFields> = async (body) => {
    if (userId) {
      await mutateAsync({
        city: body.city,
        complement: body.complement,
        neighborhood: body.neighborhood,
        number: body.number,
        state: body.state,
        street: body.street,
        zipCode: body.zipCode,
        userId: userId,
      })
    }
  }

  useEffect(() => {
    if (address)
      form.reset({
        zipCode: address.zipCode as unknown as string,
        city: address.city,
        state: address.state,
        neighborhood: address.neighborhood,
        street: address.street,
        number: address.number as unknown as string,
        complement: address.complement,
      })
  }, [form, address])

  return {
    onUpdateAddress,
    isLoading,
    isLoadingMutate: isPending,
    form,
  }
}
