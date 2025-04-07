import { useEffect } from 'react'
import { BoxProps } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'

import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { CForm } from '@/components/Forms'
import { useLayout } from '@/hooks/useLayout'
import { PageHeader } from '@/v3/presentation/newComponents'
import { useFetchReadHealthUnit } from '@/v3/presentation/hooks/api/@v2/health-units/health-unit/useFetchReadHealthUnit'
import { useMutateEditHealthUnit } from '@/v3/presentation/hooks/api/@v2/health-units/health-unit/useMutateEditHealthUnit'

import {
  FinancialStep,
  LinkStep,
  OperationStep,
  ServiceStep,
  UnitStep,
} from '../../components/Form/Steps'
import { NavigationButtonsProps } from '../../components/Form/NavigationButtons'

import { schema } from './schemas'

export function EditHealthUnit() {
  const router = useRouter()
  const { queryParam } = useUrlQueryControl({ queryName: 'section' })
  const { healthUnit } = useFetchReadHealthUnit({ healthUnitId: Number(router.query.id) })
  const { mutateAsync } = useMutateEditHealthUnit()
  const { showSnackBar } = useLayout()

  const form = useForm({ resolver: yupResolver(schema) })

  const handleSubmit = (values: any) => {
    mutateAsync({
      healthUnitId: Number(router.query.id),
      payload: {
        ...values,
        type: values.healthUnitType,
        address: {
          ...values.address,
          complement: `${values.address.complement || ''} | ${values.address.block || ''}`,
        },
        infrastructure: {
          ...values.infrastructure,
          ...(values.infrastructure?.openAt && {
            openAt: dayjs(values.infrastructure.openAt).format('HH:mm'),
          }),
          ...(values.infrastructure?.closeAt && {
            closeAt: dayjs(values.infrastructure.closeAt).format('HH:mm'),
          }),
        },
      },
    }).then(() => {
      showSnackBar({ type: 'success', message: 'As informações foram salvas!' })
      router.back()
    })
  }

  const buttons: NavigationButtonsProps = {
    next: { label: 'Salvar', type: 'submit' },
    back: { hidden: true },
  }

  const groupProps: BoxProps = { m: 0 }

  const mapEditable = new Map([
    [
      'administrative',
      <UnitStep
        key={1}
        sections={['administrative']}
        buttonsProps={buttons}
        groupProps={groupProps}
      />,
    ],
    [
      'contacts',
      <UnitStep key={1} sections={['contacts']} buttonsProps={buttons} groupProps={groupProps} />,
    ],
    [
      'address',
      <UnitStep key={1} sections={['address']} buttonsProps={buttons} groupProps={groupProps} />,
    ],
    ['financial', <FinancialStep key={1} buttonsProps={buttons} groupProps={groupProps} />],
    ['operation', <OperationStep key={1} buttonsProps={buttons} groupProps={groupProps} />],
    ['services', <ServiceStep key={1} buttonsProps={buttons} groupProps={groupProps} />],
    ['institutions', <LinkStep key={1} />],
  ])

  useEffect(() => {
    if (healthUnit?.infrastructure.openAt)
      form.reset({
        ...healthUnit?.toJSON(),
        healthUnitType: healthUnit?.type,
        infrastructure: {
          ...healthUnit?.infrastructure,
          ...(healthUnit?.infrastructure?.openAt && {
            openAt: dayjs(healthUnit?.infrastructure?.openAt, 'HH:mm').toISOString(),
          }),
          ...(healthUnit?.infrastructure?.closeAt && {
            closeAt: dayjs(healthUnit?.infrastructure?.closeAt, 'HH:mm').toISOString(),
          }),
        },
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [healthUnit])

  return (
    <>
      <PageHeader title={healthUnit?.company?.name || 'Editar unidade'} />

      <CForm form={form} onSubmit={handleSubmit}>
        {mapEditable.get(queryParam)}
      </CForm>
    </>
  )
}
