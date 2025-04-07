import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { Box } from '@mui/material'

import CStepper from '@/v3/presentation/newComponents/layout/CStepper'
import { CForm } from '@/components/Forms'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useMutateAddNetwork } from '@/v3/presentation/hooks/api/organizations/network/useMutateAddNetwork'
import { useMutateAddBrand } from '@/v3/presentation/hooks/api/organizations/brand/useMutateAddBrand'
import { useMutateAddInstitution } from '@/v3/presentation/hooks/api/organizations/institution/useMutateAddInstitution'
import { NEW_ROUTES } from '@/constants/routes'
import { PageHeader } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'

import { OrganizationType } from '../../constants/organizationType'
import { OrganizationStep } from '../../components/Steps/OrganizationStep'
import { ContactsStep } from '../../components/Steps/ContactsStep'
import { AddressStep } from '../../components/Steps/AddressStep'
import { FinancialStep } from '../../components/Steps/FinancialStep'
import { LinkStep } from '../../components/Steps/LinkStep'
import { SettingsStep } from '../../components/Steps/SettingsStep'
import { Step } from '../../components/Steps/Step'
import { formatHour } from '../../utils/formatHour'

import { schema } from './schema'

export const AddOrganization = () => {
  const router = useRouter()
  const isSmallDevice = useMediaQuery('sm')

  const { addNetworkMutate, isLoadingAddNetwork } = useMutateAddNetwork()
  const { addBrandMutate, isLoadingAddBrand } = useMutateAddBrand()
  const { addInstitutionMutate, isLoadingAddInstitution } = useMutateAddInstitution()

  const { queryParam, setQueryParam } = useUrlQueryControl({
    queryName: 'step',
    startValue: 'Organização',
  })
  const form = useForm({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      organization: { organizationType: OrganizationType.INSTITUTION },
      settings: {
        communication: {
          openingOfServices: true,
          changesInService: true,
          disableNotifications: true,
          pendingFirstAccess: true,
        },
        standardCoverage: {
          startTime: dayjs(formatHour('07:00')),
          endTime: dayjs(formatHour('19:00')),
        },
        financial: {
          infringement: false,
          latePayment: false,
        },
      },
    },
  })

  const organizationType = form.watch('organization.organizationType') as OrganizationType

  const steps = useMemo(() => {
    const steps = ['Organização', 'Contatos', 'Endereço', 'Financeiro', 'Vínculos']

    if (organizationType === OrganizationType.INSTITUTION) {
      steps.push('Configurações')
    }

    return steps
  }, [organizationType])

  const activeStep = useMemo(() => {
    return steps.map((s) => s.toLowerCase()).indexOf(queryParam?.toLowerCase())
  }, [queryParam, steps])

  useEffect(() => {
    if (!queryParam) {
      setQueryParam(steps[0])
    }
  }, [queryParam, setQueryParam, steps])

  const handleSubmit = (values: Record<string, any>) => {
    const onSuccess = () => router.push(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.path)

    if (organizationType === OrganizationType.INSTITUTION) {
      addInstitutionMutate(values as any).then(onSuccess)
    }

    if (organizationType === OrganizationType.NETWORK) {
      addNetworkMutate(values as any).then(onSuccess)
    }

    if (organizationType === OrganizationType.BRAND) {
      addBrandMutate(values as any).then(onSuccess)
    }
  }

  const handleNext = () => {
    const nextStep = activeStep + 1
    setQueryParam(steps[nextStep])
  }

  const handleBack = () => {
    const nextStep = activeStep - 1
    setQueryParam(steps[nextStep])
  }

  return (
    <>
      <PageHeader title='Adicionar organização' />
      <CForm id='myForm' form={form} onSubmit={handleSubmit}>
        <Box sx={{ pt: 3 }}>
          <CStepper steps={steps} activeStep={activeStep} noPadding={isSmallDevice}>
            <Step noBorder schemaProperty='organization' onNext={handleNext} noPadding>
              <OrganizationStep />
            </Step>

            <Step
              noBorder
              schemaProperty='contacts'
              onNext={handleNext}
              onBack={handleBack}
              noPadding
            >
              <ContactsStep />
            </Step>

            <Step
              noBorder
              schemaProperty='address'
              onNext={handleNext}
              onBack={handleBack}
              noPadding
            >
              <AddressStep />
            </Step>

            <Step
              noBorder
              schemaProperty='financial'
              onNext={handleNext}
              onBack={handleBack}
              noPadding
            >
              <FinancialStep />
            </Step>

            <Step
              onNext={organizationType === OrganizationType.INSTITUTION ? handleNext : undefined}
              onBack={handleBack}
              isLoading={isLoadingAddInstitution || isLoadingAddNetwork || isLoadingAddBrand}
              noPadding
              noBorder
            >
              <LinkStep organizationType={organizationType} />
            </Step>

            {organizationType === OrganizationType.INSTITUTION ? (
              <Step
                schemaProperty='settings'
                onBack={handleBack}
                isLoading={isLoadingAddInstitution || isLoadingAddNetwork || isLoadingAddBrand}
                noPadding
                noBorder
              >
                <SettingsStep />
              </Step>
            ) : (
              <></>
            )}
          </CStepper>
        </Box>
      </CForm>
    </>
  )
}
