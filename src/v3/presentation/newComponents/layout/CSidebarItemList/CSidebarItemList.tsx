import { forwardRef } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography } from '@mui/material'

import { ROUTES } from '@/constants/routes'
import { AuthState } from '@/v3/infra/services/AuthStorage'

import { TSidebarItem } from '../CSideBar/config'
import SideBarItem from '../SidebarItem'
import { TSidebarItemProps } from '../SidebarItem/SidebarItem'

interface CSidebarItemListProps {
  sidebarItems: TSidebarItem[]
  isOpen: boolean
  handleItemClick?: (item: TSidebarItem) => () => void
  toggleSidebar: () => void
  isSmallDevice: boolean
  auth: AuthState
  title?: string
  hover?: boolean
  itemProps?: (item: TSidebarItem) => Partial<TSidebarItemProps>
}

export const CSidebarItemList = forwardRef<HTMLDivElement, CSidebarItemListProps>(
  (
    {
      sidebarItems,
      isOpen,
      handleItemClick,
      toggleSidebar,
      isSmallDevice,
      auth,
      title,
      hover,
    },
    ref,
  ) => {
    const router = useRouter()

    return (
      <Box ref={ref}>
        {isOpen && title && (
          <Typography variant='h6' ml={1} mb={1} color='var(--mui-palette-grey-500)'>
            {title}
          </Typography>
        )}
        {sidebarItems?.map((item: TSidebarItem) => {
          if (item.hasPermission && !item.hasPermission(auth)) {
            return null
          }
          const isActiveRoute = item.isActive
            ? item.isActive(router.asPath)
            : router.asPath.includes(`${ROUTES.MODULES.APP}${item.route}`)

          const itemIcon = item.CustomComponent ? (
            <Box sx={{ mx: 2, display: 'flex' }}>
              <item.CustomComponent />
            </Box>
          ) : (
            <item.icon sx={{ fontSize: 19 }} />
          )

          return (
            <div id={item.id} key={item.name}>
              <SideBarItem
                key={item.id}
                text={item.name}
                onClick={item.onClick || handleItemClick?.(item)}
                isOpen={isOpen}
                isActive={isActiveRoute}
                Icon={itemIcon}
                toggleSidebar={toggleSidebar}
                isSmallDevice={isSmallDevice}
                itemColor={item.itemColor}
                isNew={item.isNew}
                subRoutes={item.subRoutes}
                subRouteClick={handleItemClick}
                hover={hover}
                disabled={item?.disabled}
              />
            </div>
          )
        })}
      </Box>
    )
  },
)

CSidebarItemList.displayName = 'CSidebarItemList'

export default CSidebarItemList
