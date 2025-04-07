import {
  TApiListInstitutions,
  TApiOrganization,
} from '@/v3/domain/api/organizations/ApiOrganizationResponse'
import { InstitutionConfig } from '@/constants/institutionConfig'
import { formatTime } from '@/v3/utils/formatTime'
import { CostCenter, InstitutionStatus } from '@/v3/domain/organizations/Organization'

import apiRequest from '../api'

interface ListBrandsFilters {
  limit: number
  offset: number
  searchName?: string
  brandIds?: number[]
  networkId?: number
  InstitutionStatus?: string
  status?: InstitutionStatus
  type?: CostCenter
  costCenter?: boolean
  infringement?: boolean
}

interface AddInstitutionPayload {
  logo?: File
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
    institution: {
      brand: number
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

  settings: {
    standardCoverage?: {
      openingHours?: boolean
      startTime?: string
      endTime?: string
      emergencyCallcenter?: string[]
      amenities?: number
      accidentCoverage?: string[]
      accidentCoverageValue?: string
      mentalHealthModule?: string[]
      nutritionCoverage?: string[]
    }

    coalaAtHome?: {
      enable: boolean
      profiles?: string[]
      plan?: string[]
    }

    extendedCoverage?: {
      enable: boolean
      enableProducts?: string[]
      profiles?: string[]
      manuallyAssignUser?: boolean
    }

    communication?: {
      openingOfServices?: boolean
      changesInService?: boolean
      disableNotifications?: boolean
      pendingFirstAccess?: boolean
    }

    financial?: {
      valuePerUserCovered?: {
        manager?: string
        employee?: string
        student?: string
      }

      costCenter?: string
      emails?: string[]
      infringement?: boolean
      latePayment?: boolean
    }
  }
}

export const addInstitution = (payload: AddInstitutionPayload) => {
  const settings = [
    payload.settings.standardCoverage?.openingHours && {
      profiles: [],
      institutionalName: InstitutionConfig.OPENING_HOURS,
      value: [
        payload.settings.standardCoverage?.startTime &&
          formatTime(payload.settings.standardCoverage?.startTime),

        payload.settings.standardCoverage?.endTime &&
          formatTime(payload.settings.standardCoverage?.endTime),
      ],
    },

    (payload.settings.standardCoverage?.emergencyCallcenter ||
      payload.settings.standardCoverage?.amenities) && {
      profiles: payload.settings.standardCoverage?.emergencyCallcenter || [],
      institutionalName: InstitutionConfig.EMERGENCY_CALLCENTER,
      value: payload.settings.standardCoverage?.amenities,
    },

    (payload.settings.standardCoverage?.accidentCoverage ||
      payload.settings.standardCoverage?.accidentCoverageValue) && {
      profiles: payload.settings.standardCoverage?.accidentCoverage,
      institutionalName: InstitutionConfig.COVERAGE,
      value: payload.settings.standardCoverage?.accidentCoverageValue,
    },

    payload.settings.standardCoverage?.mentalHealthModule && {
      profiles: payload.settings.standardCoverage?.mentalHealthModule,
      institutionalName: InstitutionConfig.MENTAL_HEALTH_PRODUCT,
      value: null,
    },

    payload.settings.standardCoverage?.nutritionCoverage && {
      profiles: payload.settings.standardCoverage?.nutritionCoverage,
      institutionalName: InstitutionConfig.NUTRITION_COVERAGE,
      value: null,
    },

    payload.settings?.coalaAtHome?.enable && {
      profiles: payload.settings.coalaAtHome?.profiles || [],
      institutionalName: InstitutionConfig.CAN_PAY_COVERAGE,
      value: payload.settings.coalaAtHome?.plan,
    },

    payload.settings.extendedCoverage?.enable && {
      profiles: payload.settings.extendedCoverage?.profiles,
      institutionalName: InstitutionConfig.COVERAGE_EXTENSION,
      value: payload.settings.extendedCoverage?.enableProducts || [],
    },

    {
      profiles: [],
      institutionalName: InstitutionConfig.CAN_USE_COVERAGE_EXTENSION,
      value: payload.settings.extendedCoverage?.manuallyAssignUser,
    },

    {
      profiles: [],
      institutionalName: InstitutionConfig.HELP_NOTIFICATION,
      value: payload.settings.communication?.openingOfServices,
    },

    {
      profiles: [],
      institutionalName: InstitutionConfig.STATUS_NOTIFICATION,
      value: payload.settings.communication?.changesInService,
    },

    {
      profiles: [],
      institutionalName: InstitutionConfig.NOTIFICATION,
      value: payload.settings.communication?.disableNotifications,
    },

    {
      profiles: [],
      institutionalName: InstitutionConfig.NOTIFICATION_TO_FIRST_ACCESS,
      value: payload.settings.communication?.pendingFirstAccess,
    },

    {
      profiles: [],
      institutionalName: InstitutionConfig.COVERAGE_VALUE,
      value: [
        payload.settings.financial?.valuePerUserCovered?.manager || 0,
        payload.settings.financial?.valuePerUserCovered?.employee || 0,
        payload.settings.financial?.valuePerUserCovered?.student || 0,
      ],
    },

    payload.settings.financial?.costCenter && {
      profiles: [],
      institutionalName: InstitutionConfig.CENTER_COST,
      value: payload.settings.financial?.costCenter,
    },

    payload.settings.financial?.emails && {
      profiles: [],
      institutionalName: InstitutionConfig.SEND_EMAIL_INVOICE,
      value: payload.settings.financial?.emails,
    },

    payload.settings.financial?.infringement && {
      profiles: [],
      institutionalName: InstitutionConfig.INFRINGEMENT,
      value: payload.settings.financial?.infringement,
    },

    payload.settings.financial?.latePayment && {
      profiles: [],
      institutionalName: InstitutionConfig.LATE_PAYMENT,
      value: payload.settings.financial?.latePayment,
    },
  ].filter(Boolean)

  const formData = new FormData()

  formData.append('image', (payload as any).logo)
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
  formData.append('brandId', payload?.links?.institution?.brand?.toString() || '0')
  formData.append('settings', JSON.stringify(settings))

  payload?.financial?.dueDate && formData.append('dueDate', payload.financial.dueDate)

  return apiRequest<any>({
    method: 'POST',
    path: 'cost-center/institution',
    body: formData,
    throwError: true,
    cType: 'multipart/form-data',
  })
}

export function editInstitution({ id, payload }: { id: number; payload: AddInstitutionPayload }) {
  const settings = [
    payload.settings.standardCoverage?.openingHours &&
      (payload.settings.standardCoverage?.startTime ||
        payload.settings.standardCoverage?.endTime) && {
        profiles: [],
        institutionalName: InstitutionConfig.OPENING_HOURS,
        value: [
          payload.settings.standardCoverage?.startTime &&
            formatTime(payload.settings.standardCoverage?.startTime),

          payload.settings.standardCoverage?.endTime &&
            formatTime(payload.settings.standardCoverage?.endTime),
        ],
      },

    (payload.settings.standardCoverage?.emergencyCallcenter ||
      payload.settings.standardCoverage?.amenities) && {
      profiles: payload.settings.standardCoverage?.emergencyCallcenter || [],
      institutionalName: InstitutionConfig.EMERGENCY_CALLCENTER,
      value: payload.settings.standardCoverage?.amenities,
    },

    (payload.settings.standardCoverage?.accidentCoverage ||
      payload.settings.standardCoverage?.accidentCoverageValue) && {
      profiles: payload.settings.standardCoverage?.accidentCoverage,
      institutionalName: InstitutionConfig.COVERAGE,
      value: payload.settings.standardCoverage?.accidentCoverageValue,
    },

    payload.settings.standardCoverage?.mentalHealthModule && {
      profiles: payload.settings.standardCoverage?.mentalHealthModule,
      institutionalName: InstitutionConfig.MENTAL_HEALTH_PRODUCT,
      value: null,
    },

    payload.settings.standardCoverage?.nutritionCoverage && {
      profiles: payload.settings.standardCoverage?.nutritionCoverage,
      institutionalName: InstitutionConfig.NUTRITION_COVERAGE,
      value: null,
    },

    payload.settings?.coalaAtHome?.enable && {
      profiles: payload.settings.coalaAtHome?.profiles || [],
      institutionalName: InstitutionConfig.CAN_PAY_COVERAGE,
      value: payload.settings.coalaAtHome?.plan,
    },

    payload.settings.extendedCoverage?.enable && {
      profiles: payload.settings.extendedCoverage?.profiles,
      institutionalName: InstitutionConfig.COVERAGE_EXTENSION,
      value: payload.settings.extendedCoverage?.enableProducts || [],
    },

    payload.settings.extendedCoverage?.enable && {
      profiles: [],
      institutionalName: InstitutionConfig.CAN_USE_COVERAGE_EXTENSION,
      value: payload.settings.extendedCoverage?.manuallyAssignUser,
    },

    {
      profiles: [],
      institutionalName: InstitutionConfig.HELP_NOTIFICATION,
      value: payload.settings.communication?.openingOfServices,
    },

    {
      profiles: [],
      institutionalName: InstitutionConfig.STATUS_NOTIFICATION,
      value: payload.settings.communication?.changesInService,
    },

    {
      profiles: [],
      institutionalName: InstitutionConfig.NOTIFICATION,
      value: payload.settings.communication?.disableNotifications,
    },

    {
      profiles: [],
      institutionalName: InstitutionConfig.NOTIFICATION_TO_FIRST_ACCESS,
      value: payload.settings.communication?.pendingFirstAccess,
    },

    {
      profiles: [],
      institutionalName: InstitutionConfig.COVERAGE_VALUE,
      value: [
        payload.settings.financial?.valuePerUserCovered?.manager || 0,
        payload.settings.financial?.valuePerUserCovered?.employee || 0,
        payload.settings.financial?.valuePerUserCovered?.student || 0,
      ],
    },

    payload.settings.financial?.costCenter && {
      profiles: [],
      institutionalName: InstitutionConfig.CENTER_COST,
      value: payload.settings.financial?.costCenter,
    },

    payload.settings.financial?.emails && {
      profiles: [],
      institutionalName: InstitutionConfig.SEND_EMAIL_INVOICE,
      value: payload.settings.financial?.emails,
    },

    payload.settings.financial?.infringement && {
      profiles: [],
      institutionalName: InstitutionConfig.INFRINGEMENT,
      value: payload.settings.financial?.infringement,
    },

    payload.settings.financial?.latePayment && {
      profiles: [],
      institutionalName: InstitutionConfig.LATE_PAYMENT,
      value: payload.settings.financial?.latePayment,
    },
  ].filter(Boolean)

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
  formData.append('brandId', payload?.links?.institution?.brand?.toString() || '0')
  settings && formData.append('settings', JSON.stringify(settings.filter(Boolean)))
  payload?.financial?.dueDate && formData.append('dueDate', payload.financial.dueDate)
  payload?.removeImage && formData.append('removeImage', payload.removeImage.toString())

  return apiRequest<TApiOrganization>({
    method: 'POST',
    path: `cost-center/institution/update/${id}`,
    body: formData,
    throwError: true,
    cType: 'multipart/form-data',
  })
}

export function listInstitutions(filters: ListBrandsFilters) {
  return apiRequest<TApiListInstitutions>({
    method: 'GET',
    path: 'cost-center/institution',
    queryParams: filters,
  })
}

export function getInstitution(
  institutionId: number,
  options?: { selectUserProfileCount?: boolean },
) {
  return apiRequest<any>({
    method: 'GET',
    path: `cost-center/institution/${institutionId}`,
    throwError: true,
    headers: {
      'x-institution-id': institutionId,
      'x-children-id': undefined,
      'x-self-access': undefined,
    },
    queryParams: {
      selectUserProfileCount: options?.selectUserProfileCount,
    },
  })
}

interface ToggleInstitutionStatus {
  institutionId: number
}
export function toggleInstitutionStatus({ institutionId }: ToggleInstitutionStatus) {
  return apiRequest<TApiOrganization>({
    method: 'DELETE',
    path: `cost-center/institution/${institutionId}`,
  })
}

export function getInstitutionHospitals(institutionId: number, limit?: number, offset?: number) {
  return apiRequest({
    path: `health-units/institutions/${institutionId}`,
    method: 'GET',
    useSpinner: true,
    queryParams: {
      institutionId,
      limit,
      offset,
    },
  })
}
