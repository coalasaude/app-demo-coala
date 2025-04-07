import { useForm } from 'react-hook-form'
import Router from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { get } from 'lodash'
import { Typography } from '@mui/material'

import Paper from '@/v3/presentation/components/Paper'
import { CForm, CSelectControlled, CDatePickerControlled } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { useLazyFetch } from '@/hooks/useFetch'
import { AUTHENTICATED_ROUTES, ROUTES } from '@/constants/routes'
import { CurrencyOptions } from '@/constants/currency'
import { IntervalOptions } from '@/constants/interval'
import { PlanTypeOptions } from '@/constants/planType'
import ContentWrapper from '@/v3/presentation/components/layout/ContentWrapper'
import { PageHeader } from '@/v3/presentation/newComponents'
import { CInputControlled } from '@/v3/presentation/newComponents'

const schema = yup.object({
  amount: yup.number().required(),
  product_name: yup.string().required(),
  currency: yup.string().required(),
  interval: yup.string().required(),
  is_upgrade: yup.boolean().required(),
  cancel_at: yup.date().nullable(),
  type: yup.string().required(),
})

const initialValues = {
  amount: 0,
  product_name: '',
  currency: '',
  interval: '',
  is_upgrade: false,
  cancel_at: null,
  type: '',
}

export const AddPlan = () => {
  const { handleSubmit, control, formState, reset, ...others } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  })
  const [apiRequest, { error }] = useLazyFetch()

  const onSubmit = async (body: any) => {
    const { amount, original_amount, ...values } = body
    const amountCents = amount * 100
    const { data } = await apiRequest({
      path: `plan`,
      method: 'POST',
      body: {
        ...values,
        amount: amountCents,
        original_amount: original_amount * 100,
      },
    })

    if (data?.id) {
      Router.push(`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.PLAN}`)
    }
  }

  return (
    <>
      <PageHeader
        title='Plano de assinatura'
        actionButtonProps={{
          onClick: handleSubmit(onSubmit),
          children: 'Cadastrar',
        }}
      />
      <CForm form={{ handleSubmit, control, formState, reset, ...others }} onSubmit={onSubmit}>
        <Paper>
          <ContentWrapper>
            <Typography variant='h4' mb={2}>
              Informações do plano
            </Typography>
            <GridWrapper>
              <GridItem xs={12} md={4}>
                <CInputControlled
                  name='product_name'
                  placeholder='Insira o nome do produto'
                  label='Produto'
                />
              </GridItem>
              <GridItem xs={12} md={4}>
                <CSelectControlled
                  name='currency'
                  label='Moeda'
                  options={CurrencyOptions}
                  error={get(error, 'data.currency')}
                />
              </GridItem>
              <GridItem xs={12} md={4}>
                <CInputControlled
                  placeholder='Digite o valor'
                  name='amount'
                  label='Valor'
                  defaultValue={0}
                  inputType='currency'
                  error={get(error, 'data.amount')}
                />
              </GridItem>
              <GridItem xs={12} md={4}>
                <CInputControlled
                  placeholder='Digite o valor original'
                  name='original_amount'
                  label='Valor original'
                  inputType='currency'
                  error={get(error, 'data.original_amount')}
                />
              </GridItem>
              <GridItem xs={12} md={4}>
                <CSelectControlled
                  name='interval'
                  label='Intervalo'
                  options={IntervalOptions}
                  error={get(error, 'data.interval')}
                />
              </GridItem>
              <GridItem xs={12} md={4}>
                <CInputControlled
                  placeholder='Digite o intervalo'
                  name='interval_count'
                  label='Período entre cada intervalo'
                  error={get(error, 'data.interval_count')}
                />
              </GridItem>
              <GridItem xs={12} md={4}>
                <CInputControlled
                  name='extraInfo'
                  placeholder='Digite informações extras'
                  label='Informações extras'
                  error={get(error, 'data.extraInfo')}
                />
              </GridItem>
              <GridItem xs={12} md={4}>
                <CInputControlled
                  placeholder='Digite os dias para início de cobrança'
                  name='trial_period_days'
                  label='Dias para início de cobrança'
                  error={get(error, 'data.extraInfo')}
                />
              </GridItem>
              <GridItem xs={12} md={4}>
                <CDatePickerControlled
                  name='cancel_at'
                  label='Data de cancelamento'
                  error={get(error, 'data.cancel_at')}
                />
              </GridItem>
              <GridItem xs={12} md={4}>
                <CSelectControlled
                  name='type'
                  label='Tipo'
                  options={PlanTypeOptions}
                  error={get(error, 'data.type')}
                />
              </GridItem>
            </GridWrapper>
          </ContentWrapper>
        </Paper>
      </CForm>
    </>
  )
}

export default AddPlan
