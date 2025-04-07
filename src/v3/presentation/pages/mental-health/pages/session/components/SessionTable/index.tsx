import { Box, TableBody, TableContainer, Table, TableCell, TableHead } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Router from 'next/router'

import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'
import { MentalHealthSchedule } from '@/v3/domain/MentalHealth'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { NotFound } from '@/components/NotFound'

import { TableTitle } from '../../styles'
import { statusColor, statusLabel } from '../../../../constants/status'
import { convertToBrDate } from '../../../../utils/date'

export const SessionTable = ({
  schedules,
  reload,
}: {
  schedules: MentalHealthSchedule[]
  reload: () => void
}) => {
  return (
    <>
      <TableTitle>
        <h1>Histórico de sessões do paciente</h1>
      </TableTitle>
      {!!schedules?.length && (
        <TableContainer sx={{ padding: 0 }}>
          <Table aria-label='simple table'>
            <TableHead>
              <CTableRow>
                <TableCell>Sessão</TableCell>
                <TableCell>Data</TableCell>
                <TableCell align='right'></TableCell>
              </CTableRow>
            </TableHead>
            <TableBody>
              {schedules?.map((row) => (
                <CTableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => {
                    Router.push(
                      bindPathParams(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.SESSION.path, {
                        id: row.id,
                      }),
                    )
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <CircleIcon sx={{ width: '8px', color: statusColor[row.status] }} />
                      {statusLabel[row.status]}
                    </Box>
                  </TableCell>
                  <TableCell>{convertToBrDate(row.start.toISOString())}</TableCell>
                  <TableCell align='right'>
                    <NavigateNextIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        Router.push(
                          bindPathParams(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.SESSION.path, {
                            id: row.id,
                          }),
                        )
                        reload()
                      }}
                    />
                  </TableCell>
                </CTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!schedules?.length && <NotFound />}
    </>
  )
}
