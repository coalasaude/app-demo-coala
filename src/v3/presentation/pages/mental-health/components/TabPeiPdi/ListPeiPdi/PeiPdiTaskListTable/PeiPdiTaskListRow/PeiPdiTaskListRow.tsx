import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Box, Typography } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

import CTableRow from '@/v3/presentation/newComponents/atoms/CTableRow'
import { CMenu, CTooltip } from '@/v3/presentation/newComponents'
import { BrowseTask } from '@/v3/domain/@v2/mental-health/learning'
import { useCreateTaskPeiPdiControl } from '@/v3/presentation/pages/mental-health/hooks/useCreateTaskPeiPdiControl'
import { useMutateDeleteTask } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateDeleteTask'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import ButtonIcon from '@/v3/presentation/components/ButtonIcon'

import { StatusTask } from '../../../StatusTask'
import TaskForm from '../TaskForm/TaskForm'

interface PeiPdiTaskListRowProps {
  isLastItem?: boolean
  onClickRow: (task: BrowseTask) => void
  task: BrowseTask
  isMobile?: boolean
  patientId: number
  planId?: number
  isInactivePlan?: boolean
}

const sx = {
  maxWidth: [180],
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}

const PeiPdiTaskListRow = ({
  isLastItem,
  onClickRow,
  task,
  isMobile,
  patientId,
  planId,
  isInactivePlan,
}: PeiPdiTaskListRowProps) => {
  const { onEndStep: mutateCreateTask } = useCreateTaskPeiPdiControl()
  const { mutateAsync: mutateDeleteTask } = useMutateDeleteTask()
  const { handleModal } = useModalContext()

  const handleEdit = () => {
    if (!planId) return
    return handleModal(
      <ModalCard
        sx={{
          width: 800,
        }}
      >
        <TaskForm task={task} planId={planId} categoryId={task.categoryId} isEdit />
      </ModalCard>,
    )
  }

  const handleDelete = async () => {
    return await mutateDeleteTask({
      taskId: task.id,
      userId: patientId,
    })
  }

  const handleDuplicate = async () => {
    await mutateCreateTask({
      ...task,
      categoryId: task?.categoryId || 0,
      subCategoryId: task?.subCategoryId || 0,
      patientId,
      planId: planId,
    })
  }

  return (
    <CTableRow
      key={1}
      sx={{
        position: 'relative',
        [`& .${tableCellClasses.root}`]: {
          borderBottom: isLastItem && 'none',
        },
      }}
      onClick={() => onClickRow(task)}
    >
      <TableCell sx={sx}>
        <Box
          bgcolor='var(--mui-palette-info-light)'
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius={2}
          px={1}
          gap={0.5}
        >
          <Box
            sx={{
              borderRadius: '50%',
              width: 8,
              height: 8,
              bgcolor: 'var(--mui-palette-info-main)',
            }}
          />
          <CTooltip description={task?.subCategoryName || ''}>
            <Typography
              variant='caption'
              color='var(--mui-palette-info-main)'
              overflow={'hidden'}
              textOverflow='ellipsis'
            >
              {task?.subCategoryName}
            </Typography>
          </CTooltip>
        </Box>
      </TableCell>

      <TableCell>
        <CTooltip description={task?.objective}>
          <Typography variant='body1' sx={sx}>
            {task?.objective}
          </Typography>
        </CTooltip>
      </TableCell>

      {!isMobile && (
        <>
          <TableCell>
            <CTooltip description={task?.activities}>
              <Typography variant='body1' sx={sx}>
                {task?.activities}
              </Typography>
            </CTooltip>
          </TableCell>
          <TableCell>
            <CTooltip description={task?.adaptations}>
              <Typography variant='body1' sx={sx}>
                {task?.adaptations}
              </Typography>
            </CTooltip>
          </TableCell>
          <TableCell>
            <CTooltip description={task?.supportTechnologies}>
              <Typography variant='body1' sx={{ ...sx, maxWidth: 100 }}>
                {task?.supportTechnologies}
              </Typography>
            </CTooltip>
          </TableCell>
          <TableCell>
            <CTooltip description={task?.assessment}>
              <Typography variant='body1' sx={{ ...sx, maxWidth: 100 }}>
                {task?.assessment || '-'}
              </Typography>
            </CTooltip>
          </TableCell>
        </>
      )}
      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <StatusTask
          taskId={task.id}
          taskStatus={task?.taskStatus}
          boxProps={{ sx: { mr: 'auto' } }}
          isInactivePlan={isInactivePlan}
        />
        {!isMobile && !isInactivePlan && (
          <CMenu
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            actionComponent={
              <ButtonIcon
                sx={{ mr: -1 }}
                icon={
                  <MoreVertOutlinedIcon
                    sx={{
                      color: 'var(--mui-palette-grey-500)',
                      width: 16,
                      height: 16,
                      zIndex: 999,
                    }}
                  />
                }
              />
            }
            items={[
              {
                children: (
                  <Box
                    display='flex'
                    alignItems='center'
                    width='100%'
                    gap={2}
                    px={2}
                    py={1}
                    onClick={handleEdit}
                  >
                    <Typography variant='body2'>Editar</Typography>
                  </Box>
                ),
              },
              {
                children: (
                  <Box
                    display='flex'
                    alignItems='center'
                    width='100%'
                    gap={2}
                    px={2}
                    py={1}
                    onClick={handleDelete}
                  >
                    <Typography variant='body2'>Excluir</Typography>
                  </Box>
                ),
              },
              {
                children: (
                  <Box
                    display='flex'
                    alignItems='center'
                    width='100%'
                    gap={2}
                    px={2}
                    py={1}
                    onClick={handleDuplicate}
                  >
                    <Typography variant='body2'>Duplicar</Typography>
                  </Box>
                ),
              },
            ]}
          />
        )}
      </TableCell>
    </CTableRow>
  )
}

export default PeiPdiTaskListRow
