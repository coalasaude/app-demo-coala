import { useRouter } from 'next/router'

import { useFetchInstitution } from '@/v3/presentation/hooks/api/organizations/institution/useFetchInsitution'
import { useFetchBrand } from '@/v3/presentation/hooks/api/organizations/brand/useFetchBrand'
import { useFetchNetwork } from '@/v3/presentation/hooks/api/organizations'
import { PageHeader } from '@/v3/presentation/newComponents'

import { OrganizationType } from '../../constants/organizationType'
import { FormSkeleton } from '../../components/FormSkeleton'
import { EditForm } from '../../components/EditForm'

import { schema } from './schema'

export const EditOrganization = () => {
  const router = useRouter()
  const organizationType = (router?.query?.type as string)?.toUpperCase() as OrganizationType
  const fetchers = {
    [OrganizationType.INSTITUTION]: useFetchInstitution,
    [OrganizationType.BRAND]: useFetchBrand,
    [OrganizationType.NETWORK]: useFetchNetwork,
  }

  const fetch = fetchers[organizationType]
  const { data } = fetch(Number(router?.query?.id as string))

  return (
    <>
      <PageHeader title='Editar informações' />
      {data ? <EditForm data={data} schema={schema} /> : <FormSkeleton />}
    </>
  )
}
