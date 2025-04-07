import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from '@mui/material'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined'
import { useRouter } from 'next/router'

import { TableBodySkeleton } from '@/components/Skeletons/TableBodySkeleton'
import { CButton } from '@/v3/presentation/newComponents'
import CTableRow from '@/v3/presentation/newComponents/atoms/CTableRow'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { BrowseCategoryTask } from '@/v3/domain/@v2/mental-health/learning/browse-category-task.model'
import { BrowseTaskConstructor } from '@/v3/domain/@v2/mental-health/learning'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useAvailableMentalHealthManage } from '@/v3/presentation/pages/users/components/hook/useAvailableMentalHealthManage'

import PeiPdiTaskListRow from './PeiPdiTaskListRow/PeiPdiTaskListRow'
import TaskView from './TaskView/TaskView'

interface PeiPdiTaskListTableProps {
  isLoading?: boolean
  tasks: BrowseCategoryTask
  planId?: number
  isInactivePlan?: boolean
  onClickAddTask: (categoryId?: number) => void
}

const PeiPdiTaskListTable = ({
  isLoading,
  tasks,
  onClickAddTask,
  planId,
  isInactivePlan,
}: PeiPdiTaskListTableProps) => {
  const { handleModal } = useModalContext()
  const isMobile = useMediaQuery('sm')
  const { query } = useRouter()
  const { canManageMentalHealthPlan } = useAvailableMentalHealthManage()

  const formatedTaskText = tasks.tasks.length > 1 ? 'tarefas' : 'tarefa'

  const handleClickTask = (task: BrowseTaskConstructor) => {
    handleModal(
      <ModalCard       
      innerBoxProps={{
        sx: {
          height: '100%'
        }
      }}
      sx={{ 
      width: ['95vw !important','65vw !important'], 
      height:['726px !important', '533px !important'] ,
      overflow: 'hidden'
      }}
      >
        <TaskView task={task} isInactivePlan={isInactivePlan} />
      </ModalCard>,
    )
  }

  return (
    <Box mb={3}>
      <Box display='flex' alignItems='center' gap={2} mb={1}>
        <Box
          sx={{
            backgroundColor: 'var(--mui-palette-grey-500)',
            borderRadius: 2,
            px: [4, 6],
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              borderRadius: '50%',
              width: 8,
              height: 8,
              bgcolor: 'white',
            }}
          />
          <Typography variant='body2' color='white'>
            {tasks.category}
          </Typography>
        </Box>
        <Typography variant='caption' color='var(--mui-palette-grey-500)' flexWrap='nowrap'>
          {tasks.tasks.length + ' ' + formatedTaskText}
        </Typography>
        <CButton
          variant='link'
          sx={{ color: 'var(--mui-palette-grey-500)', display: 'flex', gap: 1 }}
          onClick={() => onClickAddTask(tasks.tasks[0].categoryId)}
          disabled={isInactivePlan}
        >
          <ControlPointOutlinedIcon sx={{ fontSize: 'medium' }} />
          Adicionar
        </CButton>
      </Box>
      {isLoading ? (
        <TableBodySkeleton />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <CTableRow>
                <TableCell width={200}>Subcategoria</TableCell>
                <TableCell>Objetivos</TableCell>
                {!isMobile && (
                  <>
                    <TableCell>Atividades propostas</TableCell>
                    <TableCell>Adaptações curriculares</TableCell>
                    <TableCell>Tecnologias de apoio</TableCell>
                    <TableCell>Avaliação</TableCell>
                  </>
                )}
                <TableCell>Status</TableCell>
              </CTableRow>
            </TableHead>
            <TableBody>
              {tasks.tasks?.map((task, index) => (
                <PeiPdiTaskListRow
                  key={index}
                  isLastItem={index === -1}
                  onClickRow={() => handleClickTask(task)}
                  task={task}
                  isMobile={isMobile}
                  patientId={Number(query.userId)}
                  planId={planId}
                  isInactivePlan={isInactivePlan}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {canManageMentalHealthPlan && (
        <CButton
          variant='link'
          sx={{ color: 'var(--mui-palette-grey-500)', display: 'flex', gap: 1, mt: 1 }}
          onClick={() => onClickAddTask(tasks.tasks[0].categoryId)}
          disabled={isInactivePlan}
        >
          <ControlPointOutlinedIcon sx={{ fontSize: 'medium' }} />
          Adicionar tarefa
        </CButton>
      )}
    </Box>
  )
}

export default PeiPdiTaskListTable
