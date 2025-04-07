import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Table, TableBody, TableCell, TableContainer, TableHead } from '@mui/material'
import { capitalize } from 'lodash'
import Router from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { RecordStatusEnum } from '@/v3/domain/api/ApiMentalHealthRecord'
import { Record } from '@/v3/domain/Record'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'

import { convertToBrDate } from '../../../../utils/date'
import { TableTitle } from '../../styles'

export const RegisterTable = ({
  records,
  sessionId,
}: {
  records?: Record[]
  sessionId: number
}) => {

  return (
    <>
      <TableTitle>
        <h1>Registros da Sessão</h1>
      </TableTitle>
      {!!records?.length && (
        <TableContainer sx={{ padding: 0 }}>
          <Table aria-label='simple table'>
            <TableHead>
              <CTableRow>
                <TableCell>Status</TableCell>
                <TableCell>Data</TableCell>
                <TableCell align='right'></TableCell>
              </CTableRow>
            </TableHead>
            <TableBody>
              {records?.map((record) => (
                <CTableRow
                  key={record.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{capitalize(RecordStatusEnum[record.status])}</TableCell>
                  <TableCell>{convertToBrDate(record.createdAt)}</TableCell>
                  <TableCell align='right'>
                    <NavigateNextIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() =>
                        Router.push(
                          bindPathParams(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.RECORD.path, {
                            id: sessionId,
                            recordId: record.id,
                          }),
                        )
                      }
                    />
                  </TableCell>
                </CTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!records?.length && <NotFound />}
    </>
  )
}
