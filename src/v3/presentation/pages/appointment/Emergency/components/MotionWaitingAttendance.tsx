import { Box, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import Paper from '@/v3/presentation/components/Paper'
import { WebViewManager } from '@/services/WebView'
import { AppointmentStatus } from '@/types/appointment'
import { getJistisUrl } from '@/utils/getJitsiUrl'
import { useFetchReadAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchReadAppointment'

export const MotionWaitingAttendance = () => {
  const router = useRouter()
  const appointmentId = useMemo(
    () => Number(router.query.subId) || Number(router.query.id),
    [router.query.id, router.query.subId],
  )
  const { appointment, meeting } = useFetchReadAppointment({
    appointmentId,
    refetchInterval: 30000,
  })

  const onStartAppointment = useCallback(async () => {
    // TODO: Criar um tipo novo para esse Document
    if (WebViewManager.hasWebView()) {
      // Hack para enviar uma mensagem do webview do app e abrir o link no chrome
      WebViewManager.getWebView().postMessage(
        `VIDEO_URL: ${getJistisUrl({
          roomId: String(appointment?.id || ''),
          jwt: meeting?.token,
        })}`,
      )

      return
    }
  }, [appointment?.id, meeting?.token])

  useEffect(() => {
    const canStart =
      appointment?.status !== AppointmentStatus.WAITING_ATTENDANCE &&
      appointment?.status !== AppointmentStatus.FINISHED

    if (canStart) {
      onStartAppointment()
    }
  }, [appointment, onStartAppointment])

  return (
    <Paper p={4}>
      <Box display='flex' justifyContent='center' alignContent='center'>
        <Grid container alignItems='center'>
          <Grid item xs={12} sm={6} md={6} lg={6} pl={[0, 4, 18, 32]}>
            <Typography variant='h1' color='var(--mui-palette-primary-main)' id='motionTitle'>
              Aguarde...
            </Typography>
            <Typography variant='h4' color='var(--mui-palette-grey-800)' id='motionDescription'>
              estamos chamando o time de cuidado,
            </Typography>
            <Typography variant='h4' color='var(--mui-palette-grey-800)'>
              logo você será atendido 💜
            </Typography>
            <Box mt={2}>
              <Typography variant='caption'>
                Certifique-se de que seu aparelho está com boa
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>conexão com a internet.</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            display='flex'
            alignItems='center'
            justifyContent='center'
            pr={[0, 4, 18, 32]}
          >
            <DotLottieReact
              src='https://lottie.host/0c211c0a-21d7-4043-abd2-2de233524453/FRoNPGY2q8.json'
              loop
              autoplay
              style={{ width: '100%', minWidth: '600px' }}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default MotionWaitingAttendance
