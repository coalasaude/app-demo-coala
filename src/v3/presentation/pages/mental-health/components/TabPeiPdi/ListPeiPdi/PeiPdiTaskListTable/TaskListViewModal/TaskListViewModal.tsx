import { Box, Typography } from '@mui/material'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined'
import { useRouter } from 'next/router'

import { CButton, CDivider } from '@/v3/presentation/newComponents'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { useFetchBrowsePeiPdi } from '@/v3/presentation/hooks/api/@v2/mental-health/useFetchBrowsePeiPdi'
import { useAvailableMentalHealthManage } from '@/v3/presentation/pages/users/components/hook/useAvailableMentalHealthManage'
import { DefaultStatus } from '@/types/status'

import PeiPdiTaskListTable from '../PeiPdiTaskListTable'

interface ListPeiPdiItemProps {
  onAddTask: () => void
  planId: number
}

const TaskListViewModal = ({ planId, onAddTask }: ListPeiPdiItemProps) => {
  const router = useRouter()
  const userId = Number(router.query.userId)
  const { peiPdi } = useFetchBrowsePeiPdi({ userId })
  const peiPdiTasks = peiPdi?.find((item) => item.id === planId)?.category
  const { canManageMentalHealthPlan } = useAvailableMentalHealthManage()
  const filteredPeiPdi = peiPdi?.filter((item) => item.id === planId)
  const isActive = filteredPeiPdi[0].status === DefaultStatus.ACTIVE

  return (
    <Box height='95vh' overflow='scroll'>
      <Box display='flex' alignItems='center' justifyContent='space-between' mb={2}>
        <Typography variant='h1'>Lista de tarefas</Typography>
      </Box>

      {peiPdiTasks && peiPdiTasks.length > 0 ? (
        peiPdiTasks.map((task, index) => (
          <PeiPdiTaskListTable
            key={index}
            tasks={task}
            onClickAddTask={onAddTask}
            isInactivePlan={!isActive}
          />
        ))
      ) : (
        <NotFound text='Ainda não há tarefas neste plano' />
      )}

      <CDivider sx={{ my: 3 }} />

      <Box width='100%' textAlign='end'>
        <CButton variant='secondary' sx={{ justifySelf: 'flex-end' }} disabled={!isActive}>
          Encerrar plano
        </CButton>
      </Box>

      <CDivider sx={{ my: 3 }} />

      {canManageMentalHealthPlan && (
        <CButton
          sx={{ display: 'flex', gap: 1, width: '100%' }}
          onClick={onAddTask}
          disabled={!isActive}
        >
          <ControlPointOutlinedIcon sx={{ fontSize: 'medium' }} />
          Criar tarefa
        </CButton>
      )}
    </Box>
  )
}

export default TaskListViewModal
