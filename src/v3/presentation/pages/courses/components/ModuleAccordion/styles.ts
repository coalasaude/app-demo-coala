import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import AccordionDetails from '@mui/material/AccordionDetails'
import { styled } from '@mui/material/styles'

import { spacing } from '@/v3/presentation/utils/spacing'

export const ModuleAccordionWrapper = styled(Accordion)`
  width: 100%;
  border-radius: ${spacing(1)} !important;
  border: 2px solid #e3e5ea;
  box-shadow: none !important;
`

export const StyledModuleAccordionTitle = styled(Typography)`
  font-size: 16px;
  color: var(--mui-palette-grey-700);
`

export const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  padding: 0;
`
export const StyledAccordionWrapper = styled('div')<{ isClickable?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e5ea;
  padding: ${spacing(2)};
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  ${({ isClickable }) => isClickable && ':hover { background-color: var(--mui-palette-grey-100); }'}
`

export const StyledAccordionItem = styled('div')`
  display: flex;
  gap: ${spacing(1)};
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
    color: var(--mui-palette-grey-700);
  }
`

export const StyledAccordionItemTitle = styled(Typography)`
  font-size: 14px;
  color: var(--mui-palette-grey-700);
  font-weight: 500;
`

export const StyledProgressBarWrapper = styled('div')<{ hasMinWidth?: boolean }>`
  padding: 0 ${spacing(2)} 0 0;
  margin-right: ${spacing(3)};
  min-width: ${({ hasMinWidth }) => (hasMinWidth ? '250px' : 'auto')};
`
