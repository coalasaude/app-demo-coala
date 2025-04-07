import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

import { spacing } from '@/v3/presentation/utils/spacing'
import { breakpoint } from '@/utils/breakpoints'
import { CCardBase } from '@/v3/presentation/newComponents'

export const StyledCourseCardWrapper = styled(CCardBase)`
  padding: ${spacing(1)};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${spacing(1)};
  width: 100%;
  min-height: 190px;
  height: 100%;
`
export const StyledCourseCardImageWrapper = styled('div')`
  position: relative;
  border-radius: ${spacing(1)};
  overflow: hidden;
  width: 100%;
  height: ${spacing(11)};

  @media (min-width: ${breakpoint('md')}) {
    height: ${spacing(14)};
  }

  @media (min-width: ${breakpoint('lg')}) {
    height: ${spacing(17)};
  }
`

export const StyledCourseCardTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
`

export const StyledCourseCardInfoLink = styled('div')`
  font-size: 13px;
  font-weight: bold;
  color: var(--mui-palette-primary-main);
  display: flex;
  align-items: flex-start;
  gap: ${spacing(1)};
  padding: ${spacing(0.5)};

  svg {
    width: 18px;
    height: 18px;
  }
`
