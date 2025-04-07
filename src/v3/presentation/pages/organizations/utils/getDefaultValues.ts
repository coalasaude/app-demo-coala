import { InstitutionConfigEnum } from '@/constants/institutionConfig'
import { Brand, Institution, Network, Organization } from '@/v3/domain/organizations/Organization'

import { OrganizationType } from '../constants/organizationType'

import { formatHour } from './formatHour'

export function getDefaultValues(
  data: Organization | Institution | Brand | Network,
  organizationType: OrganizationType
) {
  const defaultValues = {
    organization: {
      nickname: data?.nickname,
      fantasyName: data?.fantasyName,
      socialReason: data?.socialReason,
      cnpj: data?.cnpj,
    },

    contacts: {
      email: data?.email,
      telephone: data?.telephone,
      whatsapp: data?.whatsapp,
    },

    address: {
      zipCode: data?.address?.zipCode,
      city: data?.address?.city,
      state: data?.address?.state,
      street: data?.address?.street,
      number: data?.address?.number,
      complement: data?.address?.complement,
      block: data?.address?.block,
      neighborhood: data?.address?.neighborhood,
    },

    financial: {
      responsableFinance: data?.responsableFinance,
      dueDate: data?.dueDate,

      bank: {
        bank: data?.bankAccount?.bank,
        agency: data?.bankAccount?.agency,
        account: data?.bankAccount?.account,
        pixKey: data?.bankAccount?.pixKey,
      },
    },

    links: {
      ...(organizationType === OrganizationType.NETWORK && {
        network: {
          brands: (data as Network)?.brand?.map((brand) => brand.id),
        },
      }),

      ...(organizationType === OrganizationType.BRAND && {
        brand: {
          network: (data as Brand)?.network?.id,
        },
      }),

      ...(organizationType === OrganizationType.INSTITUTION && {
        institution: {
          brand: (data as Institution)?.brand?.id,
        },
      }),
    },

    ...(organizationType === OrganizationType.INSTITUTION && {
      settings: {
        standardCoverage: {
          openingHours:
            (data as Institution)?.getConfig<string[]>(InstitutionConfigEnum.OPENING_HOURS)
              ?.value?.[0] !== undefined,

          startTime: formatHour(
            (data as Institution)?.getConfig<string[]>(InstitutionConfigEnum.OPENING_HOURS)
              ?.value?.[0]
          ),

          endTime: formatHour(
            (data as Institution)?.getConfig<string[]>(InstitutionConfigEnum.OPENING_HOURS)
              ?.value?.[1]
          ),

          emergencyCallcenter: (data as Institution)
            ?.getConfig<string>(InstitutionConfigEnum.EMERGENCY_CALLCENTER)
            ?.profiles?.map((profile) => profile.id),

          amenities: (data as Institution)?.getConfig<string>(
            InstitutionConfigEnum.EMERGENCY_CALLCENTER
          )?.value,

          accidentCoverage: (data as Institution)
            ?.getConfig<string>(InstitutionConfigEnum.COVERAGE)
            ?.profiles?.map((profile) => profile.id),

          accidentCoverageValue: (data as Institution)?.getConfig<string>(
            InstitutionConfigEnum.COVERAGE
          )?.value,

          mentalHealthModule: (data as Institution)
            ?.getConfig<string>(InstitutionConfigEnum.MENTAL_HEALTH_PRODUCT)
            ?.profiles?.map((profile) => profile.id),
        },

        coalaAtHome: {
          enable:
            (data as Institution)
              ?.getConfig(InstitutionConfigEnum.CAN_PAY_COVERAGE)
              ?.profiles?.map((profile) => profile.id).length > 0 ||
            (data as Institution)?.getConfig(InstitutionConfigEnum.CAN_PAY_COVERAGE)?.value,

          profiles: (data as Institution)
            ?.getConfig(InstitutionConfigEnum.CAN_PAY_COVERAGE)
            ?.profiles?.map((profile) => profile.id),

          plan: (data as Institution)?.planId,
        },

        extendedCoverage: {
          enable: Boolean(
            (data as Institution)?.getConfig(InstitutionConfigEnum.CAN_USE_COVERAGE_EXTENSION)
              ?.value ||
              (data as Institution)?.getConfig(InstitutionConfigEnum.COVERAGE_EXTENSION)?.value
                .length ||
              (data as Institution)?.getConfig(InstitutionConfigEnum.COVERAGE_EXTENSION)?.profiles
                ?.length
          ),

          enableProducts: (data as Institution)?.getConfig(InstitutionConfigEnum.COVERAGE_EXTENSION)
            ?.value,

          profiles: (data as Institution)
            ?.getConfig(InstitutionConfigEnum.COVERAGE_EXTENSION)
            ?.profiles?.map((profile) => profile.id),

          manuallyAssignUser: (data as Institution)?.getConfig(
            InstitutionConfigEnum.CAN_USE_COVERAGE_EXTENSION
          )?.value,
        },

        communication: {
          openingOfServices: (data as Institution)?.getConfig(
            InstitutionConfigEnum.HELP_NOTIFICATION
          )?.value,

          changesInService: (data as Institution)?.getConfig(
            InstitutionConfigEnum.STATUS_NOTIFICATION
          )?.value,

          disableNotifications: (data as Institution)?.getConfig(InstitutionConfigEnum.NOTIFICATION)
            ?.value,

          pendingFirstAccess: (data as Institution)?.getConfig(
            InstitutionConfigEnum.NOTIFICATION_TO_FIRST_ACCESS
          ),
        },

        financial: {
          valuePerUserCovered: {
            manager: (data as Institution)?.getConfig(InstitutionConfigEnum.COVERAGE_VALUE)
              ?.value?.[0],

            employee: (data as Institution)?.getConfig(InstitutionConfigEnum.COVERAGE_VALUE)
              ?.value?.[1],

            student: (data as Institution)?.getConfig(InstitutionConfigEnum.COVERAGE_VALUE)
              ?.value?.[2],
          },

          costCenter: (data as Institution)?.getConfig<string[]>(InstitutionConfigEnum.CENTER_COST)
            ?.value,

          emails: (data as Institution)?.getConfig(InstitutionConfigEnum.SEND_EMAIL_INVOICE)?.value,
        },
      },
    }),
  }

  return defaultValues
}
