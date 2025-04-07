import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { CSelectControlled } from '@/components/Forms'
import { CSearchList } from '@/v3/presentation/components/CSearchList'
import { useFetchListNetworks } from '@/v3/presentation/hooks/api/organizations/network/useFetchListNetworks'
import { useFetchListInstitutions } from '@/v3/presentation/hooks/api/organizations/institution/useFetchListInstitutions'

import { Section } from '../../Section'

export const Brand = () => {
  const router = useRouter()
  const brandId = Number(router?.query?.id as string)
  const [searchName, setSearchName] = useState('')
  const [pagination, setPagination] = useState({ limit: 15, offset: 0 })

  const { data: networksData } = useFetchListNetworks({})
  const { data: institutionsData } = useFetchListInstitutions({
    ...pagination,
    brandIds: [brandId],
    searchName,
  })

  const networkOptions = useMemo(() => {
    return networksData?.results?.map((r: any) => ({ label: r.fantasyName, value: r.id }))
  }, [networksData])
  const defaultOption = { label: '', value: 0 }

  const institutionNames = useMemo(() => {
    return institutionsData?.results?.map((r: any) => r.fantasyName)
  }, [institutionsData])

  const handleSearch = (value: string) => {
    setSearchName(value)
  }

  return (
    <>
      <Section title='Rede vinculada'>
        <CSelectControlled
          name='links.brand.network'
          label='Selecione a rede'
          options={[defaultOption, ...(networkOptions || [])]}
        />
      </Section>

      {brandId ? (
        <Section title='Instituições vinculadas'>
          <CSearchList
            items={institutionNames || []}
            label='Instituições'
            onSearch={handleSearch}
            pagination={{
              total: institutionsData?.count || 0,
              limit: pagination?.limit || 0,
            }}
            onPaginate={(page) => {
              setPagination({ ...pagination, offset: pagination.limit * (page - 1) })
            }}
          />
        </Section>
      ) : null}
    </>
  )
}
