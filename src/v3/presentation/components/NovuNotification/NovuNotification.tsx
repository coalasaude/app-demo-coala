import { Box, Popover } from '@mui/material'
import { useState } from 'react'

import { useBreakpoint } from '@/hooks/useBreakpoints'

import { useAuth } from '../../hooks/useAuth'
import { CDivider } from '../../newComponents'
import CTabs from '../TabsContainer'

import { NotificationBell } from './components/NotificationBell/NotificationBell'
import { NotificationHeader } from './components/NotificationHeader/NotificationHeader'
import { NotificationList } from './components/NotificationList'
import { NotificationTabBadge } from './components/NotificationTabBadge'

export const NovuNotification = () => {
  const { auth } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [tabIndex, setTabIndex] = useState(0)
  const isMobile = useBreakpoint('sm', 'down')

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const profileNames = auth.user?.getProfileNames() || []
  const open = Boolean(anchorEl)
  const id = open ? 'novu-popover' : undefined

  return (
    <div>
      <NotificationBell id={id} onClick={handleClick} />
      <Popover
        onClose={handleClose}
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorReference={isMobile ? 'none' : 'anchorEl'}
        slotProps={
          isMobile
            ? {
                paper: {
                  sx: {
                    width: '100vw',
                    height: '100vh',
                    maxHeight: '100vh',
                    maxWidth: '100vw',
                  },
                },
              }
            : undefined
        }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{
            width: ['100vw', '380px'],
            height: ['100vh', '668px'],
            backgroundColor: 'var(--mui-palette-background-paper)',
            borderRadius: '16px',
            p: 3,
            pb: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <NotificationHeader
            onClose={isMobile ? handleClose : undefined}
            profileName={profileNames[tabIndex]}
          />
          <CDivider sx={{ mt: 2, mb: 1 }} />
          {profileNames.length > 1 && (
            <CTabs
              tabsNames={profileNames}
              queryName='notification-tab'
              onChangeTab={(tabIndex) => setTabIndex(tabIndex)}
              defaultIndex={0}
              border='none'
              boxShadow='none'
              width={'100%'}
              flex={1}
              display={'flex'}
              flexDirection={'column'}
              containerProps={{
                height: '100%',
                width: '100%',
                flex: 1,
                overflow: 'hidden',
              }}
              tabsWrapperProps={{ sx: { borderBottom: 'none' } }}
              tabsBody={profileNames.map((profileName) => (
                <NotificationList
                  onClose={handleClose}
                  profileName={profileName}
                  key={profileName}
                />
              ))}
              tabsProps={profileNames.map((profileName) => ({
                icon: <NotificationTabBadge profileName={profileName} key={profileName} />,
              }))}
            />
          )}
          {profileNames.length == 1 && (
            <NotificationList onClose={handleClose} profileName={profileNames[0]} />
          )}
        </Box>
      </Popover>
    </div>
  )
}
