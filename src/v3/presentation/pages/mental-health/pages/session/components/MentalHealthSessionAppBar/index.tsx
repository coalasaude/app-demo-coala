import { Box, Button } from '@mui/material'
import Router from 'next/router'

import { GoBack } from '@/v3/presentation/components/GoBack'
import { useParams } from '@/hooks/useParams'
import NavbarActions from '@/v3/presentation/components/NavbarActions'
import PageSubtitle from '@/v3/presentation/components/Mobile/PageSubtitle'
import { MentalHealthSchedule } from '@/v3/domain/MentalHealth'
import { AppointmentStatus } from '@/types/appointment'
import { MentalHealthScheduleStatus } from '@/v3/domain/api/ApiMentalHealthSchedule'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { useLayout } from '@/hooks/useLayout'
import useMediaQuery from '@/hooks/useMediaQuery'
import PageTitle from '@/v3/presentation/newComponents/layout/PageTitle'

import { useMentalHealthContext } from '../../../../contexts/mental-health.provider'
import { useFetchMentalHealth } from '../../../../hooks/useFetchMentalHealth'
import { FinalizeSessionModal } from '../FinalizeSessionModal'
import { CancelSessionModal } from '../CancelSessionModal'

const MentalHealthSessionAppBar = ({
  session,
  reload,
}: {
  session?: MentalHealthSchedule
  reload: () => void
}) => {
  const { setParams } = useParams()
  const isSmallDevice = useMediaQuery('sm')
  const { appointment, status } = session || {}
  const isFinished = appointment?.status === AppointmentStatus.FINISHED
  const { userViewConfig } = useMentalHealthContext()
  const { handleModal } = useModalContext()

  const { showSnackBar } = useLayout()

  const { updateMentalHealthSession } = useFetchMentalHealth()
  return (
    <Box>
      <Box display='flex' alignItems='center'>
        <GoBack sx={{ mr: 2 }} onClick={() => Router.back()} />
        <Box>
          <PageSubtitle>Saúde mental</PageSubtitle>
          <PageTitle>Agendamento</PageTitle>
        </Box>
      </Box>
      <Box display='flex' alignItems='center' gap={2}>
        {
          <NavbarActions>
            <>
              {status && userViewConfig?.session[status]?.secondary && (
                <Button
                  variant='outlined'
                  color='primary'
                  fullWidth={isSmallDevice}
                  sx={{ marginRight: 1 }}
                  onClick={() =>
                    handleModal(
                      session?.status === MentalHealthScheduleStatus.Agendada ? (
                        <CancelSessionModal
                          handleSubmit={async () => {
                            setParams(appointment)
                            await updateMentalHealthSession(
                              {
                                status: MentalHealthScheduleStatus.Cancelada,
                                id: String(session?.id),
                              },
                              'Sessão cancelada com sucesso',
                            )
                            handleModal()
                            reload()
                          }}
                        />
                      ) : (
                        <FinalizeSessionModal
                          onSubmit={(body: { status: string }) => {
                            if (!body.status) {
                              showSnackBar({
                                message: 'Selecione uma das opções para finalizar a sessão',
                                type: 'error',
                              })
                              handleModal()
                              return
                            }
                            userViewConfig?.session[status]?.secondary?.action({
                              id: String(appointment?.id),
                              cb: async () => {
                                setParams(appointment)
                                await updateMentalHealthSession(
                                  {
                                    status: body.status as MentalHealthScheduleStatus,
                                    id: String(session?.id),
                                  },
                                  'Sessão atualizada com sucesso',
                                )
                                handleModal()
                                reload()
                              },
                            })
                          }}
                        />
                      ),
                    )
                  }
                >
                  {userViewConfig?.session[status]?.secondary?.icon?.()}
                  <Box ml={userViewConfig?.session[status]?.secondary?.icon ? 2 : 0}>
                    {userViewConfig?.session[status]?.secondary?.title}
                  </Box>
                </Button>
              )}
              {status && userViewConfig?.session[status]?.primary && (
                <Button
                  fullWidth={isSmallDevice}
                  onClick={() => {
                    setParams(appointment)
                    userViewConfig?.session[status]?.primary?.action({
                      id: String(appointment?.id),
                      cb: async () => {
                        await updateMentalHealthSession(
                          {
                            status: MentalHealthScheduleStatus.Confirmada,
                            id: String(session?.id),
                          },
                          'Sessão confirmada com sucesso',
                        )
                        reload()
                      },
                    })
                  }}
                  disabled={
                    userViewConfig?.session[status]?.primary?.title === 'Chamada de vídeo' &&
                    (isFinished || !session?.canJoin)
                  }
                >
                  {userViewConfig?.session[status]?.primary?.icon?.()}
                  <Box ml={userViewConfig?.session[status]?.primary?.icon ? 2 : 0}>
                    {userViewConfig?.session[status]?.primary?.title}
                  </Box>
                </Button>
              )}
            </>
          </NavbarActions>
        }
      </Box>
    </Box>
  )
}

export default MentalHealthSessionAppBar
