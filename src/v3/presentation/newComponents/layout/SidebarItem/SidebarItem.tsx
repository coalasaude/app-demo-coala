import { ListItem, Collapse, List } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { KeyboardArrowDownOutlined } from '@mui/icons-material'

import {
  AnimatedListItemButton,
  AnimatedListItemText,
  StyledListItemIcon,
} from '../CSideBar/styles'
import { TSidebarItem } from '../CSideBar/config'
import { CTooltip } from '../..'
import { CChipNew } from '../CChipNew'

export interface TSidebarItemProps {
  onClick?: (params?: TSidebarItem) => void
  isOpen: boolean
  isActive?: boolean
  Icon?: ReactNode
  text: string
  toggleSidebar: () => void
  isSmallDevice?: boolean
  itemColor?: string
  applyColorInIcon?: boolean
  isNew?: boolean
  subRoutes?: TSidebarItem[]
  subRouteClick?: (item: TSidebarItem) => () => void
  hover?: boolean
  disabled?: boolean
}

export const SideBarItem = ({
  isOpen,
  onClick,
  isActive,
  Icon,
  text,
  toggleSidebar,
  isSmallDevice,
  itemColor,
  isNew,
  applyColorInIcon = true,
  subRoutes = [],
  subRouteClick,
  hover,
  disabled
}: TSidebarItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasSubRoutes = subRoutes.length > 0
  const color = itemColor
    ? itemColor
    : isActive
      ? 'var(--mui-palette-primary-main)'
      : 'var(--mui-palette-grey-600)'

  const handleItemClick = () => {
    if (isSmallDevice && !hasSubRoutes) toggleSidebar()
    if (hasSubRoutes) {
      setIsExpanded(!isExpanded)
    } else {
      onClick?.()
    }
  }

  useEffect(() => {
    if (!isOpen && !!isExpanded) {
      setIsExpanded(false)
    }
  }, [isOpen, isExpanded])


  return (
    <>
      <CTooltip description={isOpen ? '' : text} placement='right'>
        <ListItem
          style={{
            borderRadius: '8px',
            backgroundColor: hover ? 'var(--mui-palette-grey-200)' : '',
          }}
          disabled={disabled}
          disablePadding
          onClick={disabled ? undefined : handleItemClick}
          
        >
          <AnimatedListItemButton
            sx={{
              height: 40,
              backgroundColor: isActive ? 'var(--mui-palette-primary-light)' : 'transparent',
            }}
          >
            <StyledListItemIcon color={color} applyColorInIcon={applyColorInIcon}>
              {Icon}
              {isNew && <CChipNew />}
            </StyledListItemIcon>
            <AnimatedListItemText
              primary={text}
              isOpen={isOpen}
              sx={{
                fontSize: '22px !important'
              }}
              primaryTypographyProps={{
                color,
              }}
            />
            {hasSubRoutes && (
              <KeyboardArrowDownOutlined
                sx={{
                  mx: 2,
                  fontSize: 20,
                  fill: isExpanded
                    ? 'var(--mui-palette-primary-main)'
                    : 'var(--mui-palette-grey-400)',
                  transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            )}
          </AnimatedListItemButton>
        </ListItem>
      </CTooltip>

      <Collapse in={isExpanded} timeout='auto' unmountOnExit>
        <List component='div'>
          {subRoutes.map((subRoute, index) => {
            return (
              <SideBarItem
                key={index}
                isOpen={isOpen}
                onClick={subRouteClick?.(subRoute) || subRoute.onClick}
                isActive={!!subRoute.isActive}
                text={subRoute.name}
                toggleSidebar={toggleSidebar}
                isSmallDevice={isSmallDevice}
                itemColor={subRoute.itemColor}
                isNew={subRoute.isNew}
                subRoutes={subRoute.subRoutes}
              />
            )
          })}
        </List>
      </Collapse>
    </>
  )
}

export default SideBarItem
