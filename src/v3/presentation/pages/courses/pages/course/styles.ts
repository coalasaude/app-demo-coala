import { styled } from '@mui/material/styles'

import { spacing } from '@/v3/presentation/utils/spacing'
import { Paper } from '@/v3/presentation/components/Paper'
import { breakpoint } from '@/utils/breakpoints'

export const StyledCourseWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing(2)};
  padding: ${spacing(1)};
`

export const StyledCourseBannerContainer = styled(Paper)`
  padding: ${spacing(1)};
  width: 100%;
  position: relative;
  overflow: hidden;
  height: ${spacing(28)};

  svg {
    max-height: 330px;
  }

  h1 {
    font-size: 1.375rem;
    margin: 8px;
  }

  @media (min-width: ${breakpoint('md')}) {
    height: ${spacing(40)};
  }

  @media (min-width: ${breakpoint('lg')}) {
    height: ${spacing(51)};
  }
`

export const StyledCourseContainer = styled(Paper)`
  padding: ${spacing(2)};
  width: 100%;
  position: relative;
  overflow: hidden;
`

export const StyledCourseContainerContent = styled('div')`
  margin: 0;
`

export const StyledDescriptionTitle = styled('h3')`
  margin-top: 0;
  margin-bottom: ${spacing(1)};
`
