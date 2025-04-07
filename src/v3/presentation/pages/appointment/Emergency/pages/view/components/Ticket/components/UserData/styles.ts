import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'

import { breakpoint } from '@/utils/breakpoints'

export const MobileDivider = styled(Divider)`
  display: none;
  @media (max-width: ${breakpoint('md')}) {
    width: 100%;
    padding: 4px 0;
    display: block;
  }
`

export const StyledUserDataFooter = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`

export const StyledMedicalActionsWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    margin-left: ${({ theme }) => theme.spacing(1)};
  }

  form {
    max-width: ${({ theme }) => theme.spacing(40)};
    min-width: ${({ theme }) => theme.spacing(40)};
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 0%;
    gap: ${({ theme }) => theme.spacing(2)};
    flex-direction: column;

    form {
      margin-top: ${({ theme }) => theme.spacing(2)};
      min-width: unset;
      max-width: unset;
      width: 100%;
    }

    button {
      max-width: unset;
      margin-left: unset;
    }
  }
`

export const StyledPatientName = styled('div')<{ hasPatient: boolean }>`
  ${({ hasPatient, theme }) =>
    !hasPatient
      ? `
      display: flex;
      flexDirection: 'row';
      gap: ${theme.spacing(1)};
      alignItems: center;
      justifyContent: 'center';
      `
      : ``};
  margin-left: ${({ theme }) => theme.spacing(2)};
`
