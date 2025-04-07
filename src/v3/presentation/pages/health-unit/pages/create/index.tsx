import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useParams } from '@/hooks/useParams'
import { CForm } from '@/components/Forms'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { theme } from '@/theme'
import { HealthUnitType } from '@/v3/domain/api/ApiHealthUnitResponse'
import { spacing } from '@/v3/presentation/utils/spacing'
import { NEW_ROUTES } from '@/constants/routes'
import { CStepper } from '@/v3/presentation/newComponents/layout/CStepper/CStepper'
import { PageHeader } from '@/v3/presentation/newComponents'
import { formatTime } from '@/v3/utils/formatTime'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useMutateAddHealthUnit } from '@/v3/presentation/hooks/api/@v2/health-units/health-unit/useMutateAddHealthUnit'

import {
  FinancialStep,
  OperationStep,
  ServiceStep,
  UnitStep,
  steps,
} from '../../components/Form/Steps'
import { omitEmpty } from '../../utils/omitEmpty'
import { CreateLinkStep } from '../../components/Form/Steps/createLink'

import { schema } from './schemas'

export function CreateHealthUnit() {
  const { queryParam, setQueryParam } = useUrlQueryControl({ queryName: 'step' })
  const setQueryParamRef = useRef(setQueryParam)
  const router = useRouter()
  const { params } = useParams()
  const isSmallDevice = useMediaQuery('sm')

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      healthUnitType: HealthUnitType.HOSPITAL,
      appointment: {
        doSutures: false,
        doMedication: false,
        doSurgery: false,
      },
    },
  })

  const { mutateAsync } = useMutateAddHealthUnit()

  const activeStep = steps[queryParam] ? Object.keys(steps).indexOf(queryParam) : 0

  const handleSubmit = (values: Record<string, any>) => {
    const data = {
      ...values,
      type: values.healthUnitType,
      institutionsIds: params.institutionsIds,
      address: {
        ...values.address,
        complement: `${values.address.complement || ''} | ${values.address.block || ''}`,
      },
      infrastructure: {
        ...values.infrastructure,
        openAt: formatTime(values.infrastructure?.openAt),
        closeAt: formatTime(values.infrastructure?.closeAt),
      },
    }

    mutateAsync(omitEmpty(data)).then(() => {
      router.push(NEW_ROUTES.AUTHENTICATED.HEALTH_UNIT.path)
    })
  }

  useEffect(() => {
    if (activeStep === 0) setQueryParamRef.current('unit')
  }, [activeStep])

  return (
    <>
      <PageHeader title='Adicionar unidade' />

      <CForm form={form} onSubmit={handleSubmit}>
        <Box
          sx={{
            p: spacing(3),
            [theme.breakpoints.down('sm')]: {
              p: spacing(2),
              mb: spacing(10),
            },
          }}
        >
          <CStepper
            activeStep={activeStep}
            steps={['Unidade', 'Funcionamento', 'Financeiro', 'Serviços', 'Vínculos']}
            noPadding={isSmallDevice}
          >
            <UnitStep />
            <OperationStep />
            <FinancialStep />
            <ServiceStep />
            <CreateLinkStep />
          </CStepper>
        </Box>
      </CForm>
    </>
  )
}
