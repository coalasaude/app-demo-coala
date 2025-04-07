import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { AnyObjectSchema } from 'yup'
import dayjs from 'dayjs'

import { CForm } from '@/components/Forms'
import { InstitutionConfigEnum } from '@/constants/institutionConfig'
import { Brand, Institution, Network } from '@/v3/domain/organizations/Organization'
import { useMutateEditInstitution } from '@/v3/presentation/hooks/api/organizations/institution/useMutateEditInstitution'
import { useMutateEditBrand } from '@/v3/presentation/hooks/api/organizations/brand/useMutateEditBrand'
import { useMutateEditNetwork } from '@/v3/presentation/hooks/api/organizations/network/useMutateEditNetwork'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useFetchPlan } from '@/v3/presentation/hooks/api/useFetchPlan'

import { StepContainer } from '../StepContainer'
import { AddressStep } from '../Steps/AddressStep'
import { ContactsStep } from '../Steps/ContactsStep'
import { FinancialStep } from '../Steps/FinancialStep'
import { LinkStep } from '../Steps/LinkStep'
import { OrganizationStep } from '../Steps/OrganizationStep'
import { SettingsStep } from '../Steps/SettingsStep'
import { OrganizationType } from '../../constants/organizationType'
import { SettingsSections } from '../../constants/settingsSections'
import { formatHour } from '../../utils/formatHour'

interface EditFormProps {
  data: Institution | Brand | Network
  schema: AnyObjectSchema
}

export const EditForm = ({ data, schema }: EditFormProps) => {
  const router = useRouter()
  const organizationType = (router?.query?.type as string).toUpperCase() as OrganizationType
  const { queryParam } = useUrlQueryControl({ queryName: 'section' })
  const { queryParam: settingsSection } = useUrlQueryControl<SettingsSections>({
    queryName: 'settingsSection',
  })

  const { data: plan } = useFetchPlan(
    organizationType === OrganizationType.INSTITUTION &&
      (data as Institution)?.getConfig(InstitutionConfigEnum.CAN_PAY_COVERAGE)?.value,
  )

  const mutations = {
    [OrganizationType.INSTITUTION]: useMutateEditInstitution,
    [OrganizationType.BRAND]: useMutateEditBrand,
    [OrganizationType.NETWORK]: useMutateEditNetwork,
  }

  const { mutateAsync, isLoading } = mutations[organizationType]()

  const defaultValues = {
    organization: {
      nickname: data?.nickname,
      fantasyName: data?.fantasyName,
      socialReason: data?.socialReason,
      cnpj: data?.cnpj,
      organizationType: organizationType,
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

          startTime: dayjs(
            formatHour(
              (data as Institution)?.getConfig<string[]>(InstitutionConfigEnum.OPENING_HOURS)
                ?.value?.[0] || '07:00',
            ),
          ),

          endTime: dayjs(
            formatHour(
              (data as Institution)?.getConfig<string[]>(InstitutionConfigEnum.OPENING_HOURS)
                ?.value?.[1] || '19:00',
            ),
          ),

          emergencyCallcenter: (data as Institution)
            ?.getConfig<string>(InstitutionConfigEnum.EMERGENCY_CALLCENTER)
            ?.profiles?.map((profile) => profile.id),

          amenities: (data as Institution)?.getConfig<string>(
            InstitutionConfigEnum.EMERGENCY_CALLCENTER,
          )?.value,

          accidentCoverage: (data as Institution)
            ?.getConfig<string>(InstitutionConfigEnum.COVERAGE)
            ?.profiles?.map((profile) => profile.id),

          accidentCoverageValue: (data as Institution)?.getConfig<string>(
            InstitutionConfigEnum.COVERAGE,
          )?.value,

          mentalHealthModule: (data as Institution)
            ?.getConfig<string>(InstitutionConfigEnum.MENTAL_HEALTH_PRODUCT)
            ?.profiles?.map((profile) => profile.id),

          nutritionCoverage: (data as Institution)
            ?.getConfig<string>(InstitutionConfigEnum.NUTRITION_COVERAGE)
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
                ?.length,
          ),

          enableProducts: (data as Institution)?.getConfig(InstitutionConfigEnum.COVERAGE_EXTENSION)
            ?.value,

          profiles: (data as Institution)
            ?.getConfig(InstitutionConfigEnum.COVERAGE_EXTENSION)
            ?.profiles?.map((profile) => profile.id),

          manuallyAssignUser: (data as Institution)?.getConfig(
            InstitutionConfigEnum.CAN_USE_COVERAGE_EXTENSION,
          )?.value,
        },

        communication: {
          openingOfServices: (data as Institution)?.getConfig(
            InstitutionConfigEnum.HELP_NOTIFICATION,
          )?.value,

          changesInService: (data as Institution)?.getConfig(
            InstitutionConfigEnum.STATUS_NOTIFICATION,
          )?.value,

          disableNotifications: (data as Institution)?.getConfig(InstitutionConfigEnum.NOTIFICATION)
            ?.value,

          pendingFirstAccess: (data as Institution)?.getConfig(
            InstitutionConfigEnum.NOTIFICATION_TO_FIRST_ACCESS,
          )?.value,
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

          infringement: (data as Institution)?.getConfig(InstitutionConfigEnum.INFRINGEMENT)?.value,

          latePayment: (data as Institution)?.getConfig(InstitutionConfigEnum.LATE_PAYMENT)?.value,
        },
      },
    }),
  }

  const form = useForm({ resolver: yupResolver(schema), defaultValues })

  useEffect(() => {
    form.reset({
      ...defaultValues,
      settings: {
        ...defaultValues.settings,
        coalaAtHome: {
          ...defaultValues.settings?.coalaAtHome,
          plan: plan?.id,
        },
      },
    } as typeof defaultValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan])

  const sections = new Map([
    ['administrative', <OrganizationStep sections={['administrative']} key='administrative' />],
    ['logo', <OrganizationStep sections={['logo']} key='logo' />],
    ['contacts', <ContactsStep key='contacts' />],
    ['address', <AddressStep key='address' />],
    ['financial', <FinancialStep key='financial' />],
    ['link', <LinkStep key='link' organizationType={organizationType} />],
    ['settings', <SettingsStep key='settings' sections={[settingsSection]} />],
  ])

  const handleSubmit = (values: any) => {
    const onSuccess = () => router.back()
    const id = Number(router.query.id as string)
    mutateAsync({ id, payload: values }).then(onSuccess)
  }
  return (
    <CForm id='myForm' form={form} onSubmit={handleSubmit}>
      <StepContainer confirmLabel='Salvar' isLoading={isLoading}>
        {sections.get(queryParam)}
      </StepContainer>
    </CForm>
  )
}
