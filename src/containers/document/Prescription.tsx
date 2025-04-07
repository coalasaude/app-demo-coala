import React, { useEffect } from 'react'
import { Button, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import Paper from '@/v3/presentation/components/Paper'
import { DOCUMENT_STATUS_DESCRIPTION } from '@/constants/document'
import { DefaultStatus } from '@/types/status'
import { AppointmentDocument } from '@/types/document'
import { useLazyFetch } from '@/hooks/useFetch'
import { useParams } from '@/hooks/useParams'
import { subRoutes, UNAUTHENTICATED_ROUTES } from '@/constants/routes'
import { capitalizeName } from '@/utils/capitalizeName'
import { WebViewManager } from '@/services/WebView'

export const PrescriptionData = () => {
  const {
    params: { pin },
  } = useParams()
  const router = useRouter()
  const [apiRequest, { data: document }] = useLazyFetch<AppointmentDocument>({
    useSpinner: true,
  })

  useEffect(() => {
    const getDocument = async () => {
      const { error } = await apiRequest({
        path: `document/${router.query.id}`,
        method: 'POST',
        body: {
          pin,
        },
      })

      if (error) {
        router.push(`${UNAUTHENTICATED_ROUTES.DOCUMENT}/${router.query.id}`)
      }
    }
    getDocument()
  }, [pin, apiRequest, router])

  const isExpiredDocument =
    document?.valid_until && dayjs().isSameOrAfter(dayjs(document.valid_until))
  const status = isExpiredDocument ? DefaultStatus.INACTIVE : document?.status

  if (!document) {
    return (
      <Paper sx={{ zIndex: 2, padding: 3, width: '300px' }}>
        <Skeleton variant='rectangular' width='40%' height={40} />
        <Box mt={2}>
          <Skeleton variant='rectangular' width='100%' height={150} />
        </Box>
      </Paper>
    )
  }

  return (
    <Paper sx={{ zIndex: 2, padding: 3 }}>
      <Box>
        <div>
          <Typography variant='h5'>Receituário digital</Typography>
          <Typography>
            {document.prescription_register
              ? 'Já foi realizado o fornecimento dos medicamentos deste receituário.'
              : 'Baixe o receituário e registre o o fornecimento da medicação.'}
          </Typography>
        </div>
      </Box>
      <Typography component='span'>Status do documento: </Typography>
      <Typography
        component='span'
        color={status === DefaultStatus.ACTIVE ? 'success.main' : 'error.main'}
      >
        {document.status === DefaultStatus.ACTIVE && isExpiredDocument
          ? 'Vencido'
          : DOCUMENT_STATUS_DESCRIPTION[status || '']}{' '}
        {document.invalidated_at || isExpiredDocument
          ? ` - ${dayjs(document.invalidated_at || document.valid_until).format(
              'DD/MM/YYYY HH:mm:ss',
            )}`
          : ''}
      </Typography>
      {document.prescription_register && (
        <>
          <Box>
            <Typography component='span'>Nome do farmacêutico: </Typography>
            <Typography component='span'>
              {capitalizeName(document.prescription_register.name)}
            </Typography>
          </Box>
          <Box>
            <Typography component='span'>CRF do farmacêutico: </Typography>
            <Typography component='span'>{document.prescription_register.crf}</Typography>
          </Box>
        </>
      )}
      <Box mb={2} mt={3} display='flex'>
        <Button
          variant='contained'
          type='button'
          name='download'
          sx={{ width: '50%' }}
          onClick={() => WebViewManager.open(document.url, '_blank')}
        >
          Download
        </Button>
        <Box ml={2} sx={{ width: '50%' }}>
          <Button
            variant='contained'
            type='button'
            name='register'
            fullWidth
            disabled={
              isExpiredDocument ||
              status === DefaultStatus.INACTIVE ||
              !!document.prescription_register
            }
            onClick={() =>
              router.push(
                `${UNAUTHENTICATED_ROUTES.DOCUMENT}/${router.query.id}${subRoutes.DOCUMENT.REGISTER}`,
              )
            }
          >
            Registrar fornecimento
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default PrescriptionData
