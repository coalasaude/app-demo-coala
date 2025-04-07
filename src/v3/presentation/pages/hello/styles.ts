import { styled } from '@mui/material/styles'

import { breakpoint } from '@/utils/breakpoints'
import {
  CollapsedSideBarWidth,
  OpenedSideBarWidth,
} from '@/v3/presentation/newComponents/layout/CSideBar/styles'

export const SidebarWrapper = styled('div')<{ isOpen?: boolean }>`
  @media (min-width: ${breakpoint('sm')}) {
    width: calc(100% - ${CollapsedSideBarWidth});
    margin-left: ${CollapsedSideBarWidth};
  }

  @media (max-width: ${breakpoint('sm')}) {
    ${({ isOpen }) => (isOpen ? 'display: none;' : 'display: block;')}
  }

  @media (min-width: ${breakpoint('lg')}) {
    ${({ isOpen }) =>
      isOpen
        ? `
        width: calc(100% - ${OpenedSideBarWidth});
        margin-left: ${OpenedSideBarWidth};
      `
        : `
        width: calc(100% - ${CollapsedSideBarWidth});
        margin-left: ${CollapsedSideBarWidth};
      `};
  }
`
