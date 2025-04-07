import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { ClickAwayListener } from '@mui/material'

import Paper from '@/v3/presentation/components/Paper'

interface CollapsibleEdgeDrawerProps {
  title: string
  children: React.ReactNode
  openSidebar?: boolean
  open: boolean
  setOpen: (open: boolean) => void
  refPosition?: number
}

export const CollapsibleEdgeDrawer = ({
  title,
  children,
  openSidebar,
  open,
  setOpen,
  refPosition,
}: CollapsibleEdgeDrawerProps) => {
  const toggleCollapse = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const collapsedMenuPosition = -299

  const collapseTopPosition = refPosition ? refPosition - 30 : 480

  return (
    <Box
      display='flex'
      position='fixed'
      top={collapseTopPosition}
      left={openSidebar ? 255 : 65}
      zIndex={1}
      onMouseEnter={toggleCollapse(true)}
      sx={{
        transition: 'transform 0.5s ease',
        transform: `translate(${open ? 0 : collapsedMenuPosition}px, 0)`,
      }}
    >
      <Paper
        sx={{
          width: 300,
          height: 300,
          bgcolor: 'white',
          borderRadius: 0,
          overflow: 'hidden',
          position: 'relative',
          px: 3,
          pt: 1,
        }}
      >
        <ClickAwayListener onClickAway={toggleCollapse(false)}>
          <Box overflow='hidden' width='100%' height='100%'>
            {children}
          </Box>
        </ClickAwayListener>
      </Paper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          bgcolor: 'var(--mui-palette-secondary-main)',
          height: 300,
          width: 16,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          cursor: 'pointer',
          pb: 3,
        }}
        onMouseEnter={toggleCollapse(true)}
      >
        <ArrowRightIcon sx={{ fill: 'white', width: '20px' }} />
        <Typography
          variant='caption'
          sx={{
            transform: 'rotate(90deg)',
            transformOrigin: 'center',
            display: 'inline-block',
            color: 'white',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  )
}

export default CollapsibleEdgeDrawer
