import { Box } from '@mui/material'
import styled from 'styled-components'

export const StyledSelectCard = styled(Box)<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  padding-right: 54px;
  background: var(--mui-palette-background-default);
  min-height: 80px;
  width: 100%;
  margin: 0 auto;
  border-radius: 14px;
  margin-top: 16px;
  position: relative;

  &:first-of-type {
    margin-top: 0px;
  }

  ${({ isSelected }) =>
    isSelected &&
    `
  background: var(--mui-palette-primary-light);
`}
`
