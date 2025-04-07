import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, Stack, Typography } from '@mui/material'

import { useFetchCertificate } from '@/v3/presentation/hooks/useFetchCertificate'
import { PageSpinner } from '@/components/Spinner'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'
import CLogo from '@/v3/presentation/newComponents/atoms/CLogo'
import { CButton } from '@/v3/presentation/newComponents'

export function Certificate() {
  const params = useParams<{ id: string }>()
  const certificate = useFetchCertificate(params?.id)

  useEffect(() => {
    if (certificate.data?.path) {
      downloadByProxy({ url: certificate.data?.path || '' })
    }
  }, [certificate.data?.path])

  if (certificate.isLoading) {
    return <PageSpinner isVisible={certificate.isLoading} />
  }

  return (
    <>
      <Stack
        height='100vh'
        width='100%'
        justifyContent='center'
        alignItems='center'
        position='relative'
        p={4}
      >
        <Stack gap={4} maxWidth={450}>
          <Stack textAlign='center' gap={1}>
            <Typography variant='h2'>O certificado está sendo baixado.</Typography>
            <Typography variant='body1'>
              Caso o download não inicie automaticamente, clique no botão abaixo
            </Typography>
          </Stack>

          <CButton fullWidth href={certificate.data?.path}>
            Baixar
          </CButton>
        </Stack>

        <Box position='absolute' bottom={100}>
          <CLogo size={32} variant='brand' />
        </Box>
      </Stack>
    </>
  )
}
