import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { CSelectChipControlled } from '@/v3/presentation/components/CSelectChipControlled'
import { CSearchList } from '@/v3/presentation/components/CSearchList'
import { useFetchListBrands } from '@/v3/presentation/hooks/api/organizations/brand/useFetchListBrands'
import { useFetchListInstitutions } from '@/v3/presentation/hooks/api/organizations/institution/useFetchListInstitutions'

import { Section } from '../../Section'

export const Network = () => {
  const { watch } = useFormContext()
  const brands = watch('links.network.brands') as number[]
  const [searchName, setSearchName] = useState('')
  const [pagination, setPagination] = useState({ limit: 15, offset: 0 })

  const { data: brandsData } = useFetchListBrands({})
  const { data: institutionsData } = useFetchListInstitutions({
    ...pagination,
    brandIds: brands,
    searchName,
  })

  const brandOptions = useMemo(
    () => brandsData?.results?.map((r) => ({ label: r.fantasyName, value: r.id.toString() })),
    [brandsData],
  )

  const institutionNames = useMemo(
    () => institutionsData?.results?.map((r) => r.fantasyName),
    [institutionsData],
  )

  const handleSearch = (value: string) => {
    setSearchName(value)
  }

  return (
    <>
      <Section title='Marcas vinculadas'>
        <CSelectChipControlled
          name='links.network.brands'
          placeholder='Selecione as marcas'
          options={brandOptions || []}
          multiple
        />
      </Section>

      <Section title='Instituições vinculadas'>
        <CSearchList
          items={institutionNames || []}
          label='Instituições'
          pagination={{
            total: institutionsData?.count || 0,
            limit: pagination?.limit || 0,
          }}
          onPaginate={(page) => {
            setPagination({ ...pagination, offset: pagination.limit * (page - 1) })
          }}
          onSearch={handleSearch}
        />
      </Section>
    </>
  )
}
