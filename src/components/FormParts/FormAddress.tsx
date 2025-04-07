import { get } from 'lodash'
import { UseFormSetValue } from 'react-hook-form'

import { CSelectControlled, cepNormalizer } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { ufs } from '@/constants/uf'
import { useRequest } from '@/hooks/useRequest'
import { useLazyFetch } from '@/hooks/useFetch'
import { CInputControlled } from '@/v3/presentation/newComponents'

import { onlyNumsNormalizer } from '../Forms/normalizers/onlyNumsNormalizer'

export const FormAddress = ({
  error,
  setValue,
}: {
  error: any
  setValue: UseFormSetValue<any>
  isStudentRegistration?: boolean
}) => {
  const { setRequestCounter } = useRequest()
  const [apiRequest, { data }] = useLazyFetch({ useSpinner: true })
  const getCepInfos = async (cep: string) => {
    if ((cep.length < 9 && cep.length > 0) || !cep) {
      return
    }
    setRequestCounter((prevState) => prevState + 1)
    const { data: rData } = await apiRequest({
      path: `https://viacep.com.br/ws/${cep.replace(/[^0-9]/, '')}/json/`,
      method: 'GET',
      useExternalPath: true,
    })

    if (rData) {
      setValue('address.state', rData.uf)
      setValue('address.city', rData.localidade)
      setValue('address.street', rData.logradouro)
      setValue('address.neighborhood', rData.bairro)
    }
    setRequestCounter((prevState) => prevState - 1)
  }

  return (
    <GridWrapper>
      <GridItem xs={12} md={5}>
        <CInputControlled
          name='address.zip_code'
          label='CEP'
          placeholder='Digite o CEP'
          error={get(error, 'data.address.zip_code')}
          onBlur={(e: any) => getCepInfos(e.target.value)}
          transform={{
            output: cepNormalizer,
          }}
        />
      </GridItem>
      <GridItem xs={12} md={5}>
        <CInputControlled
          name='address.city'
          placeholder='Digite a cidade'
          label='Cidade'
          disabled={!!data?.localidade}
          error={get(error, 'data.address.city')}
        />
      </GridItem>
      <GridItem xs={12} md={2}>
        <CSelectControlled
          name='address.state'
          label='Estado'
          placeholder='Selecione o estado'
          disabled={!!data?.uf}
          error={get(error, 'data.address.state')}
          options={ufs}
        />
      </GridItem>
      <GridItem xs={12} md={5}>
        <CInputControlled
          placeholder='Digite a rua'
          name='address.street'
          label='Rua'
          disabled={!!data?.logradouro}
          error={get(error, 'data.address.street')}
        />
      </GridItem>
      <GridItem xs={12} md={2}>
        <CInputControlled
          placeholder='Digite o número'
          name='address.number'
          label='Número'
          error={get(error, 'data.address.number')}
          transform={{ output: onlyNumsNormalizer }}
        />
      </GridItem>
      <GridItem xs={12} md={5}>
        <CInputControlled
          placeholder='Digite o complemento'
          name='address.complement'
          label='Complemento'
          error={get(error, 'data.address.complement')}
        />
      </GridItem>
      <GridItem xs={12} md={12}>
        <CInputControlled
          placeholder='Digite o bairro'
          name='address.neighborhood'
          label='Bairro'
          disabled={!!data?.bairro}
          error={get(error, 'data.address.neighborhood')}
        />
      </GridItem>
    </GridWrapper>
  )
}

export default FormAddress
