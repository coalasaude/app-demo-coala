import {
  TApiListNetworks,
  TApiOrganization,
} from '@/v3/domain/api/organizations/ApiOrganizationResponse'

import apiRequest from '../api'

interface ListNetworksFilters {
  limit: number
  offset: number
  searchName?: string
}

type AddNetworkPayload = {
  removeImage?: boolean
  logo: File | null
  organization: {
    nickname: string
    organizationType: string
    fantasyName: string
    socialReason: string
    cnpj: string
  }

  contacts: {
    email: string
    telephone: string
    whatsapp: string
  }

  address: {
    zipCode: string
    city: string
    state: string
    street: string
    number: string
    complement: string
    block: string
    neighborhood: string
  }

  links: {
    network: {
      brands: number[]
    }
  }

  financial: {
    responsableFinance: string
    dueDate: string

    bank: {
      bank: string
      agency: string
      account: string
      pixKey: string
    }
  }
}

export const addNetwork = (payload: AddNetworkPayload) => {
  const formData = new FormData()

  ;(payload as any)?.logo && formData.append('image', (payload as any).logo)
  formData.append('nickname', payload.organization.nickname)
  formData.append('responsableFinance', payload.financial.responsableFinance || '')
  formData.append('whatsapp', payload.contacts.whatsapp)
  formData.append('telephone', payload.contacts.telephone)
  formData.append('email', payload.contacts.email)
  formData.append('cnpj', payload.organization.cnpj)
  formData.append('socialReason', payload.organization.socialReason)
  formData.append('fantasyName', payload.organization.fantasyName)
  formData.append('address', JSON.stringify(payload.address))
  formData.append('bankAccount', JSON.stringify(payload.financial.bank))

  payload.links?.network?.brands &&
    formData.append('brandIds', payload.links?.network?.brands?.map(String).join(','))

  payload?.financial?.dueDate && formData.append('dueDate', payload.financial.dueDate)

  return apiRequest<any>({
    method: 'POST',
    path: 'cost-center/network',
    body: formData,
    throwError: true,
    cType: 'multipart/form-data',
  })
}

export function editNetwork({ id, payload }: { id: number; payload: AddNetworkPayload }) {
  const formData = new FormData()
  payload?.logo && formData.append('image', payload.logo)
  payload.organization.nickname && formData.append('nickname', payload.organization.nickname)

  payload.financial.responsableFinance &&
    formData.append('responsableFinance', payload.financial.responsableFinance)

  payload.contacts.whatsapp && formData.append('whatsapp', payload.contacts.whatsapp)
  payload.contacts.telephone && formData.append('telephone', payload.contacts.telephone)
  payload.contacts.email && formData.append('email', payload.contacts.email)
  payload.organization.cnpj && formData.append('cnpj', payload.organization.cnpj)

  payload.organization.socialReason &&
    formData.append('socialReason', payload.organization.socialReason)

  payload.organization.fantasyName &&
    formData.append('fantasyName', payload.organization.fantasyName)

  formData.append('address', JSON.stringify(payload.address))
  formData.append('bankAccount', JSON.stringify(payload.financial.bank))

  payload.links?.network?.brands &&
    formData.append('brandIds', payload.links?.network?.brands?.map(String).join(','))

  payload?.financial?.dueDate && formData.append('dueDate', payload.financial.dueDate)
  payload?.removeImage && formData.append('removeImage', payload.removeImage.toString())

  return apiRequest<TApiOrganization>({
    method: 'POST',
    path: `cost-center/network/update/${id}`,
    body: formData,
    throwError: true,
    cType: 'multipart/form-data',
  })
}

export function listNetworks(filters: ListNetworksFilters) {
  return apiRequest<TApiListNetworks>({
    method: 'GET',
    path: 'cost-center/network',
    queryParams: filters,
  })
}

export function getNetwork(networkId: number, options?: { selectUserProfileCount?: boolean }) {
  return apiRequest<TApiOrganization>({
    method: 'GET',
    path: `cost-center/network/${networkId}`,
    queryParams: {
      selectUserProfileCount: options?.selectUserProfileCount,
    },
  })
}

export function toggleNetworkStatus(brandId: number) {
  return apiRequest<TApiOrganization>({
    method: 'DELETE',
    path: `cost-center/network/${brandId}`,
  })
}
