import { styled } from '@mui/material/styles'

import { breakpoint } from '@/utils/breakpoints'
import { spacing } from '@/utils/spacing'
import {
  CollapsedSideBarWidth,
  OpenedSideBarWidth,
} from '@/v3/presentation/newComponents/layout/CSideBar/styles'

export const NavBarHeight = '65px'
export const NavBar = styled('div')<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - ${CollapsedSideBarWidth});
  height: ${NavBarHeight};
  display: flex;
  z-index: 1000;
  backdrop-filter: blur(5px);
  @media (max-width: ${breakpoint('sm')}) {
    width: 100%;
    left: 0;
    top: -1px;
  }

  @media (min-width: ${breakpoint('lg')}) {
    width: ${({ isOpen }) =>
      isOpen ? `calc(100% - ${OpenedSideBarWidth})` : `calc(100% -  ${CollapsedSideBarWidth})`};
  }
`

export const MenuItemButton = styled('div')<{ isSelected?: boolean }>`
  padding: ${spacing(1)};
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 50px;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.light};
    padding: ${spacing(1)};
  }
  ${({ isSelected, theme }) =>
    isSelected &&
    `
    padding: ${spacing(1)};
    background: ${theme.palette.primary.main};
    color: white;
    border-radius: 50px;
    &:hover {
      background: ${theme.palette.primary.dark};
      padding: ${spacing(1)};
    }
  `}
`

export const Content = styled('div')<{ isOpen: boolean | undefined; top?: string; right?: string }>`
  position: absolute;
  top: ${({ top }) => top || '0px'};
  right: ${({ right }) => right || '2%'};
  overflow: hidden;
  border-radius: 16px;
  box-shadow: rgb(0 0 0 / 13%) 0px 4px 20px;
  padding: ${spacing(1)};
  transform: opacity 349ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 232ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform-origin: 300px 0px;
  max-height: 600px;

  @media (max-width: ${breakpoint('sm')}) {
    right: 2%;
  }
  ${({ isOpen }) => isOpen === undefined && `display: none;`}
  ${({ isOpen, theme }) =>
    isOpen === false &&
    `
    animation-name: close_notification;
    animation-direction: normal;
    animation-fill-mode: forwards;
    background-color: ${theme.palette.common.white};
  `}
  ${({ isOpen, theme }) =>
    isOpen === true &&
    `
    overflow-y: auto;
    animation-duration: .2s;
    animation-name: open_notification;
    animation-direction: normal;
    animation-fill-mode: forwards;
    background-color: ${theme.palette.common.white};
  `}

  @keyframes open_notification {
    0% {
      opacity: 0;
      width: auto;
      height: auto;
      transform: scale(0.75, 0.5);
    }
    80% {
      opacity: 1;
    }
    100% {
      background: white;
      opacity: 1;
    }
  }
  @media (max-width: ${breakpoint('sm')}) {
    @keyframes open_notification {
      0% {
        opacity: 0;
        transform: translate(0, -5px);
        width: auto;
        height: auto;
      }
      80% {
        opacity: 1;
      }
      100% {
        transform: translate(0, 0);
        background: white;
        opacity: 1;
      }
    }
  }
  @keyframes close_notification {
    0% {
      opacity: 1;
      transform: translate(0, 0);
      background: white;
      min-width: 300px;
      max-height: 500px;
    }
    40% {
      border: none;
      opacity: 0;
      transform: translate(0px, -5px);
      width: 0;
      height: 0;
    }
    100% {
      opacity: 0;
      transform: translate(0px, -5px);
      display: none;
      width: 0;
      height: 0;
      background: none;
    }
  }
  @media (max-width: ${breakpoint('sm')}) {
    @keyframes close_notification {
      0% {
        opacity: 1;
        transform: translate(0, 0);
        background: white;
        min-width: 300px;
      }
      40% {
        border: none;
        opacity: 0;
        transform: translate(0px, -5px);
        width: 0;
        height: 0;
      }
      100% {
        opacity: 0;
        transform: translate(0px, -5px);
        display: none;
        width: 0;
        height: 0;
        background: none;
      }
    }
  }
`
