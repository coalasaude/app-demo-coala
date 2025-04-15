import {
  List,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  ListItemIcon,
  ListItemTextProps,
} from '@mui/material'
import { styled } from '@mui/material/styles'

export const OpenedSideBarWidth = '255px'
export const CollapsedSideBarWidth = '65px'

export const SideBar = styled(List) <{ open: boolean }>`
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(1)};
  padding-top: 0;

  .MuiListItem-root .MuiTouchRipple-child {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 0;
    width: ${OpenedSideBarWidth};
  }
`

export const SidebarContent = styled('div') <{ isOpen?: boolean }>`
  width: ${CollapsedSideBarWidth};
  transition: width 0.2s cubic-bezier(0.36, 0.41, 0.26, 0.82);
  height: 100%;

  ${({ isOpen }) => isOpen && `width: ${OpenedSideBarWidth};`}

  ${({ theme }) => theme.breakpoints.down('sm')} {
    ${({ isOpen }) => (isOpen ? 'display: flex' : 'display: none;')}
  }
`

export const SideBarLogo = styled('div')`
  height: 65px;
  padding: 12px;
  position: relative;
  border-bottom: 1px solid #ffffff2b;
  background: ${({ theme }) => theme.palette.primary.main};

  svg {
    width: 100%;
    height: 100%;
  }
`

export const AnimatedListItemText = styled(ListItemText) <ListItemTextProps & { isOpen: boolean }>`
  transition: opacity 0.2s ease;
  opacity: 0;
  
  position: relative;
  white-space: nowrap;
  ${({ isOpen }) =>
    isOpen &&
    `
      opacity: 1;
    `};
`

export const AnimatedListItemButton = styled(ListItemButton) <ListItemButtonProps>`
  height: ${({ theme }) => theme.spacing(6)};

  border-radius: 8px;
`
export const CollapseButton = styled('div') <{ isOpen?: boolean }>`
  background: white;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 4px;
  position: fixed;
  width: 20px;
  height: 20px;
  left: 55px;
  top: 23px;
  z-index: 1130;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.2s ease;
  cursor: pointer;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }

  ${({ isOpen, theme }) =>
    isOpen &&
    `
    ${theme.breakpoints.up('sm')} {
      left: 245px;
    }
    & svg {
      margin-left: 4px;
    }
  `}
`

export const StyledEmergencyButton = styled('div') <{ isOpen: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.secondary.light};
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  display: flex;
  font-weight: 700;
  padding: ${({ theme }) => theme.spacing(1)};
  transition: all 0.2s ease;

  &:hover {
    border: 1px solid ${({ theme }) => theme.palette.secondary.main};
  }
`

export const StyledListItemIcon = styled(ListItemIcon) <{
  color: string
  applyColorInIcon: boolean
}>`
  min-width: 0;
  position: relative;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-right: 16px;
  
  ${({ applyColorInIcon, color }) =>
    applyColorInIcon &&
    `
     svg {
      width: 100%;
      height: 100%;
     }

     svg path {
      fill: ${color};
    }
  `}
`
