import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import dayjs from 'dayjs'
import { Typography, Button } from '@mui/material'

import { NEW_ROUTES } from '@/constants/routes'
import { capitalizeName } from '@/utils/capitalizeName'
import { bindPathParams } from '@/utils/bindParams'
import { DiagnoseCard } from '@/v3/presentation/components/DiagnoseCard'
import { DefaultStatus } from '@/types/status'
import { GridItem, GridWrapper } from '@/components/Grid'
import { truncateString } from '@/v3/utils/truncate-string'
import ContentWrapper from '@/v3/presentation/components/layout/ContentWrapper'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { WebViewManager } from '@/services/WebView'

import InvalidateCidDialog from '../Dialog/InvalidateCidDialog'

import { TCidAppointmentProps } from './types/Tcid'

export const CidListDesktop = ({
  appointmentId,
  anchorEl,
  canManageAppointment,
  data,
  setShowRemoveModal,
  showRemoveModal,
  getCids,
  hasPatient,
}: TCidAppointmentProps) => {
  const router = useRouter()

  return (
    <ContentWrapper>
      <Box mb={2} display='flex' alignItems='center' justifyContent='space-between'>
        <Typography variant='h4'>Diagnóstico</Typography>
        {canManageAppointment && hasPatient && (
          <Button
            onClick={() => {
              const bindedPath = bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CID.path, {
                id: String(appointmentId || router.query.id),
              })
              const isCallPresent = router.pathname.includes('call')
              if (isCallPresent) {
                return WebViewManager.open(bindedPath)
              }
              router.push(bindedPath)
            }}
            size='small'
            variant='outlined'
          >
            Adicionar
          </Button>
        )}
      </Box>
      {(!data || data.length < 1) && (
        <Box mb={2}>
          <NotFound text='Não foram encontrados diagnósticos' />
        </Box>
      )}
      <GridWrapper>
        {!!data.length &&
          data.map(({ id, cid, created_at, professional, status }) => {
            const title = truncateString(cid.code_description, 32)

            return (
              <GridItem key={id} xs={12} md={3}>
                <DiagnoseCard
                  title={title}
                  professional={`${capitalizeName(professional.name)}  ${capitalizeName(
                    professional.lastname,
                  )}`}
                  isInvalid={status === DefaultStatus.INACTIVE}
                  date={dayjs(created_at).format('DD/MM/YYYY')}
                  onClick={() =>
                    router.push(
                      bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.DIAGNOSE.path, {
                        appointmentId: String(appointmentId || router.query.id),
                        id: String(id),
                      }),
                    )
                  }
                />
              </GridItem>
            )
          })}
      </GridWrapper>
      {appointmentId && anchorEl.recordId && (
        <InvalidateCidDialog
          open={showRemoveModal}
          onClose={() => setShowRemoveModal(!showRemoveModal)}
          onSuccess={getCids}
          appointmentId={appointmentId}
          id={anchorEl.recordId}
        />
      )}
    </ContentWrapper>
  )
}

export default CidListDesktop
