import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, Typography } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/system'
import * as yup from 'yup'
import { get } from 'lodash'
import { useRouter } from 'next/router'

import { useLazyFetch } from '@/hooks/useFetch'
import { GridWrapper, GridItem } from '@/components/Grid'
import Paper from '@/v3/presentation/components/Paper'
import { CForm } from '@/components/Forms/Form'
import { AppointmentDocument } from '@/types/document'
import { useParams } from '@/hooks/useParams'
import { subRoutes, UNAUTHENTICATED_ROUTES } from '@/constants/routes'
import { CInputControlled } from '@/v3/presentation/newComponents'

const schema = yup
  .object({
    name: yup.string().required(),
    crf: yup.string().required(),
    pin: yup.string().optional(),
  })
  .required()

export const RegisterPrescription = () => {
  const {
    params: { pin },
  } = useParams()
  const { handleSubmit, ...others } = useForm({
    defaultValues: { pin: '', name: '', crf: '' },
    resolver: yupResolver(schema),
  })
  const [apiRequest, { error }] = useLazyFetch<AppointmentDocument>({
    useSpinner: true,
  })
  const router = useRouter()
  const onSubmit = async (values: any) => {
    const { data } = await apiRequest({
      path: `document/${router.query.id}/prescription-register`,
      method: 'POST',
      body: {
        ...values,
        pin,
      },
    })

    if (data) {
      router.push(
        `${UNAUTHENTICATED_ROUTES.DOCUMENT}/${router.query.id}/${subRoutes.DOCUMENT.VIEW_PRESCRIPTION}`,
      )
    }
  }

  useEffect(() => {
    if (!pin && router.query.id) {
      router.push(`${UNAUTHENTICATED_ROUTES.DOCUMENT}/${router.query.id}`)
    }
  }, [pin, router])

  return (
    <Paper sx={{ zIndex: 1, padding: 3, maxWidth: 600 }}>
      <Box>
        <div>
          <Typography variant='h5' mb={2}>
            Registro de fornecimento da medicação
          </Typography>
          <Typography mb={1}>
            Insira os dados necessários do farmacêutico para informar que a medicação já foi
            fornecida.
          </Typography>
        </div>
      </Box>
      {error?.data?.message && (
        <Box mb={2} mt={0}>
          <Alert severity='error'>{error.data.message}</Alert>
        </Box>
      )}
      <CForm form={{ handleSubmit, ...others }} onSubmit={onSubmit}>
        <GridWrapper>
          <GridItem xs={12}>
            <CInputControlled
              name='name'
              rules={{ required: true }}
              label='Nome do farmacêutico'
              placeholder='Digite seu nome'
              error={get(error, 'data.name')}
            />
          </GridItem>
          <GridItem xs={12}>
            <CInputControlled
              name='crf'
              rules={{ required: true }}
              label='CRF do farmacêutico'
              placeholder='Digite seu CRF'
              error={get(error, 'data.crf')}
            />
          </GridItem>
        </GridWrapper>
        <Box mt={2}>
          <Button variant='contained' type='submit' name='submit' fullWidth>
            Registrar
          </Button>
        </Box>
      </CForm>
    </Paper>
  )
}

export default RegisterPrescription
