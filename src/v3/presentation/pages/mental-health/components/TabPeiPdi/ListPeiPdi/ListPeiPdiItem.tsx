import { Box, Typography } from '@mui/material'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined'
import { capitalize } from '@brazilian-utils/brazilian-utils'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { SaveAlt } from '@mui/icons-material'

import { CButton, CDivider } from '@/v3/presentation/newComponents'
import { CDialogue, ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { BrowsePeiPdi } from '@/v3/domain/@v2/mental-health/learning/browse-pei-pdi.model'
import { frequencyDictionary } from '@/constants/mentalHealth'
import { formatMinutesToHours } from '@/v3/utils/formatTime'
import { DefaultStatus } from '@/types/status'
import { NotFound } from '@/v3/presentation/components/NotFound'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useMutateDeletePeiPdi } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateDeletePeiPdi'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'

import TaskForm from '../ListPeiPdi/PeiPdiTaskListTable/TaskForm/TaskForm'
import PeiPdiForm from '../PeiPdiForm/PeiPdiForm'

import PeiPdiDescription from './PeiPdiDescription/PeiPdiDescription'
import PeiPdiTitle from './PeiPdiTitle/PeiPdiTitle'
import PeiPdiTaskListTable from './PeiPdiTaskListTable/PeiPdiTaskListTable'
import { formatWeekDays } from './utils/formatWeekDays'
import TaskListViewModal from './PeiPdiTaskListTable/TaskListViewModal/TaskListViewModal'
import AccordionPeiPdi from './components/AccordionPeiPdi/AccordionPeiPdi'

interface ListPeiPdiItemProps {
  peiPdi: BrowsePeiPdi
  canCreateAi: boolean
}

const sxMobile = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 0,
}

const sxDesktop = { width: 800 }

const ListPeiPdiItem = ({ peiPdi, canCreateAi }: ListPeiPdiItemProps) => {
  const router = useRouter()
  const userId = Number(router.query.userId)
  const planId = Number(peiPdi.id)
  const { user } = useFetchReadUser({ userId })
  const { handleModal } = useModalContext()
  const { mutateAsync: deletePeiPdi } = useMutateDeletePeiPdi()
  const isMobile = useMediaQuery('sm')
  const fullName = capitalize(
    `${peiPdi?.responsibleCollaborator?.name} ${peiPdi?.responsibleCollaborator?.lastName}` ||
      'Não cadastrado',
  ).trim()
  const isActive = peiPdi.status === DefaultStatus.ACTIVE

  const handleInactivePeiPdi = async () => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={async () => {
          await deletePeiPdi({ peiPdiId: peiPdi.id, userId })
        }}
        title='Encerrar plano'
        description={
          <Typography>
            Deseja <b>encerrar</b> este plano?
          </Typography>
        }
      />,
    )
  }

  const handleDownload = () => {
    if (peiPdi.document?.url) {
      downloadByProxy({ url: peiPdi.document.url })
    }
  }

  const mobileModal = useCallback(() => {
    handleModal(
      <ModalCard
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 0,
        }}
      >
        <TaskListViewModal planId={planId} onAddTask={handleAddTask} />
      </ModalCard>,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peiPdi])

  const handleAddTask = (categoryId?: number) => {
    handleModal(
      <ModalCard sx={isMobile ? sxMobile : sxDesktop}>
        <TaskForm planId={planId} categoryId={categoryId} />
      </ModalCard>,
    )
  }

  const onClickCardMobile = () => {
    if (isMobile && user) {
      return mobileModal()
    }
  }

  const handleEditPeiPdi = () => {
    if (user) {
      return handleModal(
        <ModalCard sx={isMobile ? sxMobile : sxDesktop}>
          <PeiPdiForm canCreateAi={canCreateAi} user={user} peiPdi={peiPdi} isEdit />
        </ModalCard>,
      )
    }
  }

  return (
    <AccordionPeiPdi
      expanded={isMobile ? true : undefined}
      defaultExpanded={isActive}
      onClick={onClickCardMobile}
      sx={{
        opacity: !isActive ? 0.6 : 1.0,
        ['& .MuiAccordionSummary-expandIconWrapper']: {
          display: isMobile ? 'none' : 'block',
        },
      }}
      title={
        <PeiPdiTitle
          title={peiPdi.name || 'Plano'}
          percentValue={peiPdi.taskProgressPercent?.toFixed(2) || 0}
          onEditPeiPdi={handleEditPeiPdi}
          onDeletePeiPdi={handleInactivePeiPdi}
        />
      }
      subtitle={
        <PeiPdiDescription
          responsibleCollaboratorName={fullName}
          frequency={peiPdi.frequency ? frequencyDictionary[peiPdi.frequency] : 'Não cadastrado'}
          duration={peiPdi.duration ? formatMinutesToHours(peiPdi.duration) : 'Não informado'}
          weekDays={formatWeekDays(peiPdi.day || [])}
          generalGoal={peiPdi.generalObjectives || 'Não cadastrado'}
        />
      }
    >
      {!isMobile ? (
        <>
          <CDivider sx={{ my: 3 }} />

          <Box display='flex' alignItems='center' justifyContent='space-between' mb={2}>
            <Typography variant='h5'>Lista de tarefas</Typography>
            <Box display='flex' alignItems='center' gap={2}>
              <CButton
                disabled={!peiPdi.document}
                onClick={handleDownload}
                key={1}
                variant='secondary'
              >
                Baixar
                <SaveAlt sx={{ fontSize: 20 }} />
              </CButton>{' '}
              <CButton
                sx={{ display: 'flex', gap: 1 }}
                onClick={handleAddTask}
                disabled={!isActive}
              >
                <ControlPointOutlinedIcon sx={{ fontSize: 'medium' }} />
                Criar tarefa
              </CButton>
            </Box>
          </Box>

          {peiPdi.category && peiPdi.category.length > 0 ? (
            peiPdi.category.map((task, index) => (
              <PeiPdiTaskListTable
                key={index}
                tasks={task}
                onClickAddTask={handleAddTask}
                planId={peiPdi.id}
                isInactivePlan={!isActive}
              />
            ))
          ) : (
            <NotFound text='Ainda não há tarefas neste plano' />
          )}

          <CDivider sx={{ my: 3 }} />

          <Box width='100%' textAlign='end'>
            <CButton
              variant='secondary'
              sx={{ justifySelf: 'flex-end' }}
              onClick={handleInactivePeiPdi}
              disabled={!isActive}
            >
              Encerrar plano
            </CButton>
          </Box>
        </>
      ) : null}
    </AccordionPeiPdi>
  )
}

export default ListPeiPdiItem
