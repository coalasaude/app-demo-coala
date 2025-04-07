import { EditOutlined, OpenInNew } from '@mui/icons-material'
import { Typography, Box } from '@mui/material'
import router from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { GridWrapper, GridItem } from '@/components/Grid'
import { bindPathParams } from '@/utils/bindParams'
import { useParams } from '@/hooks/useParams'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

export const UserActions = ({
  fullName,
  userId,
  institutionId,
}: {
  fullName: string
  userId?: number
  institutionId?: number
}) => {
  const { auth, setAuth } = useAuth()
  const { setParams } = useParams()
  const patientNotInformed = fullName === 'Não informado'
  const isMedical =
    auth.user?.isInstitutionalMedical(institutionId || 0) ||
    auth.user?.isMedical ||
    auth.user?.isAdmin

  return (
    <GridWrapper>
      <GridItem xs={6} md={4}>
        <Box
          color='var(--mui-palette-grey-600)'
          display='flex'
          alignItems='center'
          className='cursor-pointer'
          onClick={() => {
            router.push(
              bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, {
                userId: String(userId || ''),
              })
            )
          }}
        >
          <OpenInNew sx={{ mr: 1 }} />
          <Typography color='var(--mui-palette-grey-600)'>Dados cadastrais</Typography>
        </Box>
      </GridItem>
      <GridItem xs={6} md={4}>
        <Box
          color='var(--mui-palette-grey-600)'
          display='flex'
          alignItems='center'
          className='cursor-pointer'
          onClick={() => {
            setParams({ fullName })
            setAuth({
              selectedInstitution: undefined,
              selfAccess: false,
            })
            router.push(
              bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath}/health-historic`, {
                userId: String(userId || ''),
              })
            )
          }}
        >
          <OpenInNew sx={{ mr: 1 }} />
          <Typography color='var(--mui-palette-grey-600)'>Ficha de saúde</Typography>
        </Box>
      </GridItem>
      {!!patientNotInformed && !!isMedical && (
        <GridItem xs={6} md={4}>
          <Box
            color='red'
            display='flex'
            alignItems='center'
            className='cursor-pointer'
            onClick={() => {
              router.push(
                bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.EDIT.path, {
                  id: router.query.id,
                })
              )
            }}
          >
            <EditOutlined sx={{ mr: 1 }} />
            <Typography color='red'>Atualizar paciente</Typography>
          </Box>
        </GridItem>
      )}
    </GridWrapper>
  )
}
