import { Box, Stack, Typography } from '@mui/material'

import { CDisplayRecord } from '@/v3/presentation/newComponents'
import { BrowseTask } from '@/v3/domain/@v2/mental-health/learning'
import { useFetchBrowseTaskComments } from '@/v3/presentation/hooks/api/@v2/mental-health/useFetchBrowseTaskComments'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { StatusTask } from '../../../StatusTask'
import TaskComments from '../../../taskComments/TaskComments'

interface TaskViewProps {
  task: BrowseTask
  isInactivePlan?: boolean
}

const TaskView = ({ task, isInactivePlan }: TaskViewProps) => {
  const { user } = useAuth()
  const userId = user?.id
  const { comments } = useFetchBrowseTaskComments({ taskId: task.id, userId: userId || 0 })

  return (
    <Stack direction={['column', 'row']} py={4} px={1} gap={1} height='100%'>
      <Box display='flex' flexDirection='column' overflow='auto' width={['100%', '60%']} mr={4}>
        <Box display='flex' alignItems='center' gap={1} mb={1}>
          <Typography variant='h6'>Subcategoria</Typography>
          <Box>
            <Box
              bgcolor='var(--mui-palette-info-light)'
              display='flex'
              alignItems='center'
              justifyContent='center'
              borderRadius={2}
              gap={0.5}
              px={1}
            >
              <Box
                sx={{
                  borderRadius: '50%',
                  width: 8,
                  height: 8,
                  bgcolor: 'var(--mui-palette-info-main)',
                }}
              />
              <Typography variant='caption' color='var(--mui-palette-info-main)'>
                {task.subCategoryName}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box width={142}>
          <Typography variant='h4'>Status</Typography>

          <StatusTask
            withIcon
            taskId={task.id}
            taskStatus={task?.taskStatus}
            isInactivePlan={isInactivePlan}
          />
        </Box>

        <CDisplayRecord
          label='Objetivos'
          value={task.objective || '-'}
          valueProps={{ variant: 'h4', fontWeight: 400 }}
        />
        <CDisplayRecord
          label='Atividades propostas'
          value={task.activities || '-'}
          valueProps={{ variant: 'h4', fontWeight: 400 }}
        />
        <CDisplayRecord
          label='Adaptações curriculares'
          value={task.adaptations || '-'}
          valueProps={{ variant: 'h4', fontWeight: 400 }}
        />
        <CDisplayRecord
          label='Tecnologias de apoio'
          value={task.supportTechnologies || '-'}
          valueProps={{ variant: 'h4', fontWeight: 400 }}
        />
        <CDisplayRecord
          label='Avaliação e metas'
          value={task.assessment || '-'}
          valueProps={{ variant: 'h4', fontWeight: 400 }}
        />
      </Box>
      <Box width={['100%', '40%']} overflow='auto'>
        <TaskComments comments={comments} taskId={task.id} isInactivePlan={isInactivePlan} />
      </Box>
    </Stack>
  )
}

export default TaskView
