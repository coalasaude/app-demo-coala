import { useState } from 'react'
import { Box, BoxProps, List, ListItemButton, Menu } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useRouter } from 'next/router'

import { useMutateUpdateTask } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateUpdateTask'
import {
  MentalHealthStatusOptions,
  statusDictionaryReverse,
  MentalHealthTaskStatus,
  MentalHealthStatusOptionsDictionary,
} from '@/constants/mentalHealth'

import { StyledStatus } from './styles'

interface StatusTaskProps {
  withIcon?: boolean
  taskId: number
  taskStatus?: MentalHealthTaskStatus
  boxProps?: BoxProps
  isInactivePlan?: boolean
}

export const StatusTask = ({
  withIcon,
  boxProps,
  taskStatus,
  taskId,
  isInactivePlan,
}: StatusTaskProps) => {
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const taskStatusId: number = taskStatus ? MentalHealthStatusOptionsDictionary[taskStatus] : 0
  const [selectedIndex, setSelectedIndex] = useState(taskStatusId)
  const open = Boolean(anchorEl)
  const patientId = Number(router.query.userId)
  const { mutateAsync: updateStatusTask } = useMutateUpdateTask()

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (index: number) => {
    const taskStatus = statusDictionaryReverse[MentalHealthStatusOptions[index].key]

    setSelectedIndex(index)
    setAnchorEl(null)
    updateStatusTask({ taskId, taskStatus, patientId })
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box {...boxProps}>
      <List component='nav'>
        <ListItemButton
          onClick={handleClickListItem}
          sx={{
            width: 142,
            height: 30,
            fontSize: 14,
          }}
          disabled={isInactivePlan}
        >
          <StyledStatus
            bgcolor={MentalHealthStatusOptions[selectedIndex].bgColor}
            color={MentalHealthStatusOptions[selectedIndex].txtColor}
          >
            {MentalHealthStatusOptions[selectedIndex].key}
            {withIcon && !isInactivePlan && <KeyboardArrowDownIcon />}
          </StyledStatus>
        </ListItemButton>
      </List>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        MenuListProps={{
          role: 'listbox',
          sx: {
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            px: 1,
          },
        }}
      >
        {MentalHealthStatusOptions.map((option, index) => (
          <StyledStatus
            key={option.key}
            onClick={(e) => {
              handleMenuItemClick(index)
              e.stopPropagation()
            }}
            bgcolor={option.bgColor}
            color={option.txtColor}
          >
            {option.key}
          </StyledStatus>
        ))}
      </Menu>
    </Box>
  )
}
