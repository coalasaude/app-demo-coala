import {
  TApiListBrands,
  TApiOrganization,
} from '@/v3/domain/api/organizations/ApiOrganizationResponse'
import { DefaultStatus } from '@/types/status'

import apiRequest from '../api'

interface ListBrandsFilters {
  limit: number
  offset: number
  networkId?: number
  searchName?: string
  status?: string
}

interface AddBrandPayload {
  status?: DefaultStatus

  logo: File | null
  removeImage?: boolean

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
    brand: {
      network: number
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

export const addBrand = (payload: AddBrandPayload) => {
  const formData = new FormData()

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
  formData.append('networkId', payload?.links?.brand?.network?.toString() || '0')
  payload.logo && formData.append('image', (payload as any).logo)
  payload?.financial?.dueDate && formData.append('dueDate', payload.financial.dueDate)

  return apiRequest<any>({
    method: 'POST',
    path: 'cost-center/brand',
    body: formData,
    throwError: true,
    cType: 'multipart/form-data',
  })
}

export function editBrand({ id, payload }: { id: number; payload: AddBrandPayload }) {
  const formData = new FormData()

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

  formData.append('networkId', payload?.links?.brand?.network?.toString() || '0')
  ;(payload as any)?.logo && formData.append('image', (payload as any).logo)
  payload?.financial?.dueDate && formData.append('dueDate', payload.financial.dueDate)

  payload.status && formData.append('status', payload.status)
  payload?.removeImage && formData.append('removeImage', payload.removeImage.toString())

  return apiRequest<TApiOrganization>({
    method: 'POST',
    path: `cost-center/brand/update/${id}`,
    body: formData,
    throwError: true,
    cType: 'multipart/form-data',
  })
}

export function listBrands(filters: ListBrandsFilters) {
  return apiRequest<TApiListBrands>({
    method: 'GET',
    path: 'cost-center/brand',
    queryParams: filters,
    throwError: true,
  })
}

export function getBrand(brandId: number, options?: { selectUserProfileCount?: boolean }) {
  return apiRequest<TApiOrganization>({
    method: 'GET',
    path: `cost-center/brand/${brandId}`,
    queryParams: {
      selectUserProfileCount: options?.selectUserProfileCount,
    },
  })
}

export function toggleBrandStatus(brandId: number) {
  return apiRequest<TApiOrganization>({
    method: 'DELETE',
    path: `cost-center/brand/${brandId}`,
  })
}
