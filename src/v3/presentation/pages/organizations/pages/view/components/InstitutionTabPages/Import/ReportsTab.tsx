import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { CBaseContainer, CButton } from '@/v3/presentation/newComponents'
import CTableRow from '@/v3/presentation/newComponents/atoms/CTableRow'
import { useFetchBrowseUserOnboarding } from '@/v3/presentation/hooks/api/@v2/import/useFetchBrowseUserOnboarding'
import { NEW_ROUTES } from '@/constants/routes'
import { formatURL } from '@/v3/utils/formatURL'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { CButtonGroup } from '@/v3/presentation/newComponents/molecules/CButtonGroup'
import { ErrorObject } from '@/v3/domain/@v2/import'

import { ApproveModal, NotificationModal, RollbackModal } from './components'
import { ErrorsModal } from './components/ErrorsModal'

export const ImportTab = () => {
  const router = useRouter()
  const { response } = useFetchBrowseUserOnboarding({ institutionId: Number(router.query.id) })
  const { handleModal } = useModalContext()

  const redirectToImport = () => {
    const path = `${NEW_ROUTES.AUTHENTICATED.ORGANIZATION.INSTITUTION.path}${NEW_ROUTES.AUTHENTICATED.ORGANIZATION.INSTITUTION.IMPORT.path}`
    const route = formatURL(path, { pathParams: { id: router.query.id } })

    router.push(route)
  }

  const handleSendNotification = () => {
    handleModal(<NotificationModal />)
  }

  const handleRollback = (onboardingId: number) => {
    handleModal(<RollbackModal onboardingId={onboardingId} />)
  }

  const handleApprove = (onboardingId: number) => {
    handleModal(<ApproveModal onboardingId={onboardingId} />)
  }

  const handleErrors = (errors: ErrorObject) => {
    handleModal(<ErrorsModal errors={errors} />)
  }

  return (
    <CBaseContainer
      title={'Importações'}
      infoTitle={
        <Box>
          <CButtonGroup primary='split' orientation='horizontal' size='small' variant='primary'>
            <CButton key={2} onClick={redirectToImport}>
              Importar csv
            </CButton>

            <CButton key={1} onClick={handleSendNotification}>
              Enviar notificações
            </CButton>
          </CButtonGroup>
        </Box>
      }
      boxShadow='none'
      withContentPadding={false}
      sx={{ px: 2, pt: 1 }}
      noBorder
    >
      <TableContainer>
        <Table>
          <TableHead>
            <CTableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tipo do perfil</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Importado em</TableCell>
              <TableCell>Ações</TableCell>
            </CTableRow>
          </TableHead>

          {response?.length ? (
            <TableBody>
              {response?.map((row) => (
                <>
                  <CTableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.data.profile || '-'}</TableCell>
                    <TableCell>{row.status || '-'}</TableCell>
                    <TableCell>{row.createdAt || '-'}</TableCell>
                    {row.isWaitingReview && (
                      <TableCell>
                        <IconButton onClick={() => handleApprove(row.id)}>
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton onClick={() => handleRollback(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                    {row.hasErrorsFromValidations && (
                      <TableCell>
                        <CButton
                          onClick={() => handleErrors(row.errorsValidation)}
                          variant='secondary'
                        >
                          Ver Erros
                        </CButton>
                      </TableCell>
                    )}
                    {!row.isWaitingReview && !row.hasErrorsFromValidations && (
                      <TableCell>-</TableCell>
                    )}
                  </CTableRow>
                </>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <CTableRow>
                <TableCell colSpan={5} align='center'>
                  <Typography>Não há importações</Typography>
                </TableCell>
              </CTableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </CBaseContainer>
  )
}
