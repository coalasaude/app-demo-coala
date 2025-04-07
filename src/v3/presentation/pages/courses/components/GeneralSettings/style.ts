import { styled } from '@mui/material/styles'

import { breakpoint } from '@/utils/breakpoints'
import FileInput from '@/components/FileReader'
import { spacing } from '@/v3/presentation/utils/spacing'
import { CSelectControlled } from '@/components/Forms'
import { CTextAreaControlled } from '@/v3/presentation/newComponents'

export const ExampleFileContainer = styled('div')`
  display: flex;
  gap: 8px;
  color: var(--mui-palette-primary-main);
  cursor: pointer;
  align-items: center;
`

export const StyledCInput = styled(CTextAreaControlled)`
  width: 100%;

  @media (min-width: ${breakpoint('md')}) {
    width: 49%;
  }
`

export const StyledSelect = styled(CSelectControlled)`
  width: 100%;
  @media (min-width: ${breakpoint('md')}) {
    width: 49%;
  }
`

export const StyledFileInput = styled(FileInput)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between !important;
`

export const StyledFooterActions = styled('div')`
  padding: ${spacing(2)};
  display: flex;
  justify-content: space-between;
`

export const StyledBannerInput = styled('div')`
  width: 100%;
  @media (min-width: ${breakpoint('md')}) {
    width: 49%;
  }
`

export const StyledWrapperButtons = styled('div')`
  padding: ${spacing(1)};
  display: flex;
  gap: ${spacing(2)};
`

export const StyledDeleteWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: ${spacing(1)};
  color: var(--mui-palette-error-main);
  cursor: pointer;
  font-size: 14px;

  svg {
    width: 24px;
  }
`
