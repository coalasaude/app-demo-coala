import { Box, Table, TableBody, TableContainer, TableHead, Typography } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { useRouter } from 'next/router'

import { TableBodySkeleton } from '@/components/Skeletons/TableBodySkeleton'
import CTableRow from '@/v3/presentation/newComponents/atoms/CTableRow'
import { AvatarInfo } from '@/v3/presentation/components/AvatarInfo'
import { AppointmentStatusChip } from '@/v3/presentation/pages/appointment/Emergency/components/AppointmentStatusChip'
import { CAvatar } from '@/v3/presentation/newComponents'
import { limit } from '@/constants/api'
import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { InstitutionRequestedAnalysisModel } from '@/v3/domain/@v2/mental-health/reports/request-analysis/institution-requested-analysis.model'
import { RecordTypeAnalysisEnum } from '@/v3/domain/@v2/mental-health/enums/record-type-analysis.enum'

import { IInstitutionRequestedAnalysisListTable } from './type'

export const RequestedAnalysisTable = ({
  data = [],
  count = 0,
  onChangePage,
  isLoading,
  offset = 0,
}: IInstitutionRequestedAnalysisListTable) => {
  const router = useRouter()

  if (isLoading) return <TableBodySkeleton />

  const handleRowClick = (item: InstitutionRequestedAnalysisModel) => {
    let type = ''
    if (item.recordType === RecordTypeAnalysisEnum.REQUESTED_ANALYSIS)
      type = item.hasAnalysis ? 'MEDICIAL_ANALYSIS' : 'REQUEST_ANALYSIS'
    else {
      type = 'MEDICAL_REPORT'
    }
    router.push(
      bindPathParams(
        NEW_ROUTES.AUTHENTICATED.USERS.LEARNING.path +
          '?reportId=[reportId]&reportType=[type]&tab=1',
        {
          reportId: item.id,
          userId: item.userId,
          type,
        },
      ),
    )
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <CTableRow
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: data.length < 1 && !isLoading && 'none',
                },
              }}
            >
              <TableCell sx={{ width: ['50%', '37%'] }}>Aluno</TableCell>
              <TableCell sx={{ width: ['25%', '37%'] }}>Solicitante</TableCell>
              <TableCell sx={{ width: ['25%', '26%'] }}>Data da Solicitação</TableCell>
              <TableCell sx={{ width: ['25%', '26%'] }}>Status</TableCell>
            </CTableRow>
          </TableHead>
          {!isLoading && (
            <TableBody>
              {data.map((item, index) => {
                const { label, bgColor, circleColor } = item.getStatusFormatted()
                const isLastItem = index === data.length - 1

                return (
                  <CTableRow
                    key={item.id}
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: isLastItem && 'none',
                      },
                    }}
                    onClick={() => handleRowClick(item)}
                  >
                    <TableCell>
                      <Box width='100%'>
                        <AvatarInfo
                          imageUrl={item.image?.url}
                          title={item.userName}
                          titleProps={{ display: 'flex', alignItems: 'center' }}
                          ImageComponent={
                            <CAvatar
                              imageUrl={item.image?.url}
                              type='photo'
                              size='large'
                              photoFallback='initials'
                              name={item.userName}
                            />
                          }
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{item.requesterName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{item.createdAtFormatted}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <AppointmentStatusChip
                          title={label}
                          bgColor={bgColor}
                          circleColor={circleColor}
                        />
                      </Typography>
                    </TableCell>
                  </CTableRow>
                )
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Box p={2}>
        {data.length > 0 && (
          <CPagination
            count={Math.ceil(count / limit)}
            onChange={(e, page) => {
              onChangePage?.(page, (page - 1) * limit)
            }}
            page={Math.ceil(offset / limit + 1)}
            color='primary'
            totalCount={count}
          />
        )}
        {data.length < 1 && !isLoading && <NotFound />}
      </Box>
    </>
  )
}
