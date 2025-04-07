import React from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, Typography } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/system'
import * as yup from 'yup'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import { useLazyFetch } from '@/hooks/useFetch'
import { GridWrapper, GridItem } from '@/components/Grid'
import Paper from '@/v3/presentation/components/Paper'
import { CForm } from '@/components/Forms/Form'
import { maxLength } from '@/components/Forms/normalizers/maxLengthNormalizer'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { DOCUMENT_STATUS_DESCRIPTION } from '@/constants/document'
import { DefaultStatus } from '@/types/status'
import { AppointmentDocument } from '@/types/document'
import { useParams } from '@/hooks/useParams'
import { subRoutes, UNAUTHENTICATED_ROUTES } from '@/constants/routes'
import { WebViewManager } from '@/services/WebView'
import { CInputControlled } from '@/v3/presentation/newComponents'

const schema = yup
  .object({
    pin: yup.string().required(),
  })
  .required()

export const DocumentView = () => {
  const { handleSubmit, ...others } = useForm({
    defaultValues: { pin: '' },
    resolver: yupResolver(schema),
  })
  const [apiRequest, { data, error }] = useLazyFetch<AppointmentDocument>({
    useSpinner: true,
  })
  const router = useRouter()
  const { setParams } = useParams()
  const onSubmit = async (values: any) => {
    const { data } = await apiRequest({
      path: `document/${router.query.id}`,
      method: 'POST',
      body: values,
    })

    if (data) {
      if (data.type === 'prescription') {
        setParams({ pin: values.pin })
        router.push(
          `${UNAUTHENTICATED_ROUTES.DOCUMENT}/${router.query.id}${subRoutes.DOCUMENT.VIEW_PRESCRIPTION}`,
        )
        return
      }
      WebViewManager.open(data.url, '_blank')
    }
  }

  const isExpiredDocument = data?.valid_until && dayjs().isSameOrAfter(dayjs(data.valid_until))
  const status = isExpiredDocument ? DefaultStatus.INACTIVE : data?.status

  return (
    <Paper sx={{ zIndex: 1, padding: 3 }}>
      <Box>
        <div>
          <Typography variant='h5' mb={2}>
            Acessar via digital de documento
          </Typography>
          <Typography mb={1}>Digite a senha do documento para conseguir abri-lo.</Typography>
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
              name='pin'
              rules={{ required: true }}
              label='Senha'
              InputProps={{ style: { textAlign: 'center' } }}
              transform={{
                output: [maxLength(6), onlyNumsNormalizer],
              }}
              placeholder='Digite a senha do documento'
              error={get(error, 'data.password')}
            />
          </GridItem>
        </GridWrapper>
        {data && status && (
          <>
            <Typography component='span'>Status do documento: </Typography>
            <Typography
              component='span'
              color={status === DefaultStatus.ACTIVE ? 'success.main' : 'error.main'}
            >
              {data.status === DefaultStatus.ACTIVE && isExpiredDocument
                ? 'Vencido'
                : DOCUMENT_STATUS_DESCRIPTION[status]}{' '}
              {data.invalidated_at || isExpiredDocument
                ? ` - ${dayjs(data.invalidated_at || data.valid_until).format(
                    'DD/MM/YYYY HH:mm:ss',
                  )}`
                : ''}
            </Typography>
          </>
        )}
        <Box mt={2}>
          <Button variant='contained' type='submit' name='submit' fullWidth>
            Download
          </Button>
        </Box>
      </CForm>
    </Paper>
  )
}

export default DocumentView
