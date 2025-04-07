import { Box } from '@mui/system'
import { Button, Menu, MenuItem, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { NotFound } from '@/v3/presentation/components/NotFound'
import { formatDate } from '@/utils/formatDate'
import { User } from '@/v2/domain/User'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { WebViewManager } from '@/services/WebView'

import { SmallDeviceAppointment } from '../../Cards/SmallDeviceAppointment'
import InvalidateCidDialog from '../Dialog/InvalidateCidDialog'

import { TCidAppointmentProps } from './types/Tcid'

export const CidListMobile = ({
  appointmentId,
  anchorEl,
  canManageAppointment,
  data,
  handleClick,
  handleClose,
  setShowRemoveModal,
  showRemoveModal,
  hasPatient,
  getCids,
  open,
}: TCidAppointmentProps) => {
  const router = useRouter()

  return (
    <>
      <Box p={2} display='flex' alignItems='center' justifyContent='space-between'>
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
        <Box padding={2}>
          <NotFound text='Não foram encontrados diagnósticos' />
        </Box>
      )}
      {data &&
        data.length > 0 &&
        data.map(({ id, cid, created_at, professional }, index) => {
          return (
            <SmallDeviceAppointment
              handleClick={handleClick}
              dateText={typeof created_at === 'string' ? formatDate(created_at, 'DD.MM.YYYY') : '-'}
              id={id}
              index={index}
              title={cid.code_description}
              isTitle
              hourText={typeof created_at === 'string' ? formatDate(created_at, 'HH:MM') : '-'}
              professionalFullName={User.formatName(professional?.name, professional?.lastname)}
              professionalGenre={professional?.genre}
              key={id}
            />
          )
        })}
      <Menu id='actions' anchorEl={anchorEl.element} open={open} onClose={handleClose}>
        {canManageAppointment && (
          <MenuItem
            onClick={() => {
              setShowRemoveModal(!showRemoveModal)
            }}
          >
            Remover
          </MenuItem>
        )}
      </Menu>
      {appointmentId && anchorEl.recordId && (
        <InvalidateCidDialog
          open={showRemoveModal}
          onClose={() => setShowRemoveModal(!showRemoveModal)}
          onSuccess={getCids}
          appointmentId={appointmentId}
          id={anchorEl.recordId}
        />
      )}
    </>
  )
}

export default CidListMobile
