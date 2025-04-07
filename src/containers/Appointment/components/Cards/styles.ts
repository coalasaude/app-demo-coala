import { Box } from '@mui/material'
import styled from 'styled-components'

export const StyledCard = styled(Box)`
  padding: 8px 16px 16px 16px;
  background: white;
  min-height: 80px;
  width: 100%;
  margin: 0 auto;
  border-radius: 14px;
  margin-top: 16px;
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 1px;
    background-color: #ccc;
    position: absolute;
    bottom: 0;
    left: 4%;
    right: 4%;
  }

  &:last-child::after {
    display: none;
  }
`

export const SVGCard = styled(Box)<{ isSelected?: boolean }>`
  margin-left: 8px;

  ${({ isSelected }) =>
    isSelected &&
    `
    svg > g > rect {
      fill: var(--mui-palette-primary-main);
    }
  `}
`
