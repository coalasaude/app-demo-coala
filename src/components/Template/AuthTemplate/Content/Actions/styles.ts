import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

import { spacing } from '@/utils/spacing'
import { breakpoint } from '@/utils/breakpoints'

export const ActionGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: ${spacing(1)};

  @media (max-width: 1472px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1072px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (max-width: 900px) {
    overflow: scroll;
    display: flex;
    padding-left: ${spacing(1)};
    padding-right: ${spacing(1)};
  }
`

export const ActionButton = styled(Box)<{ isSelected?: boolean }>`
  padding: ${spacing(1)};
  display: flex;
  align-items: center;

  flex-direction: column;
  gap: ${spacing(1)};
  border-radius: ${spacing(1)};
  cursor: pointer;
  text-align: center;

  @media (max-width: 1600px) {
    padding: ${spacing(1)};
  }

  @media (max-width: ${breakpoint('md')}) {
    background: white;

    justify-content: center;

    min-width: 0;
    width: 90px;
    height: 80px;

    svg {
      width: 20px;
      height: 20px;
    }

    ${({ isSelected, theme }) =>
      isSelected &&
      `
    background: ${theme.palette.primary.main};
    svg {
      fill: ${theme.palette.common.white};
    }
`}
  }
`

export default ActionButton
