import CircleIcon from '@mui/icons-material/Circle'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead } from '@mui/material'
import { useRouter } from 'next/router'

import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { StyledTableRowClick } from '@/v3/presentation/components/Table/styles'
import TabsContainerHeader from '@/v3/presentation/components/TabsContainerHeader'
import { spacing } from '@/v3/presentation/utils/spacing'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'
import { useFetchBrowseHistorySickNote } from '@/v3/presentation/hooks/api/@v2/health-history/sick-note/useFetchBrowseSickNote'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useCheckCanManipulateHealthHistory } from '@/v3/presentation/hooks/useCheckCanManipulateHealthHistory'

import TabContentSkeleton from '../Skeletons/TabContentSkeleton'

export const TabSickNote = ({ userId }: { userId: number }) => {
  const { sickNotes: historySickNotes, isLoading } = useFetchBrowseHistorySickNote({ userId })
  const router = useRouter()

  const { user } = useFetchReadUser({ userId: userId })
  const { canManipulate } = useCheckCanManipulateHealthHistory(user!)

  const handleView = (id: number) => {
    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.SICK_NOTE.VIEW.path}`, {
        userId,
        id,
      })
    )
  }

  const handleAdd = () => {
    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.SICK_NOTE.ADD.path}`, {
        userId,
      })
    )
  }

  if (!userId || isLoading) return <TabContentSkeleton repeat={4} />

  return (
    <>
      <TabsContainerHeader
        withPadding
        label='Atestados'
        buttonLabel={canManipulate ? 'Adicionar' : undefined}
        onClick={handleAdd}
      />

      {historySickNotes?.data.length === 0 ? (
        <Box mx={spacing(2)} mb={spacing(4)}>
          <NotFound text='Não existem atestados cadastrados' />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <CTableRow>
                <TableCell
                  sx={{ width: [undefined, undefined, '25%'], paddingLeft: '12px !important' }}
                >
                  Emissão
                </TableCell>
                <TableCell sx={{ width: [undefined, undefined, '25%'] }}>Tipo</TableCell>
                <TableCell sx={{ width: [undefined, undefined, '40%'] }}>Status</TableCell>
                <TableCell sx={{ width: [undefined, undefined, '40%'] }} />
              </CTableRow>
            </TableHead>
            <TableBody>
              {historySickNotes?.data.map((sickNote) => (
                <StyledTableRowClick key={sickNote.id}>
                  <TableCell
                    sx={{ fontWeight: 'bold', paddingLeft: '12px !important' }}
                    onClick={() => handleView(sickNote.id)}
                  >
                    {sickNote.getFormattedAppointmentDate()}
                  </TableCell>
                  <TableCell onClick={() => handleView(sickNote.id)}>
                    {sickNote.isExternal ? 'Externo' : 'Coala'}
                  </TableCell>
                  <TableCell onClick={() => handleView(sickNote.id)}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CircleIcon
                        sx={{
                          width: '10px',
                          color:
                            sickNote.getStatusLabel() === 'Vigente'
                              ? 'var(--mui-palette-success-main)'
                              : 'var(--mui-palette-grey-600)',
                        }}
                      />
                      {sickNote.getStatusLabel()}
                    </Box>
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      if (sickNote.document?.url) downloadByProxy({ url: sickNote.document.url })
                    }}
                  >
                    <FileDownloadOutlinedIcon />
                  </TableCell>
                </StyledTableRowClick>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
