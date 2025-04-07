import { useFormContext } from 'react-hook-form'
import { ChangeEvent } from 'react'

import { useMutateCEP } from '@/v3/presentation/hooks/api/useMutateCep'

export const useFormCepAddress = () => {
  const { setValue } = useFormContext()

  const { mutateAsync } = useMutateCEP()

  const handleCEPChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event?.target?.value
    if (value?.length === 9) {
      mutateAsync({ cep: value }).then((response) => {
        if (!('isError' in response)) {
          setValue('state', response.uf)
          setValue('city', response.localidade)
          setValue('neighborhood', response.bairro)
          setValue('street', response.logradouro)
        }
      })
    }
  }

  return {
    handleCEPChange,
  }
}
