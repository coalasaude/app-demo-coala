import { styled } from '@mui/material/styles'

import { spacing } from '@/utils/spacing'

export const NotificationItem = styled('div')<{ isViewed: boolean }>`
  padding: ${spacing(2)};
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
  }

  ${({ isViewed }) =>
    isViewed &&
    `
    animation-duration: .6s;
    animation-name: showviewed;
    animation-direction: normal;
    animation-fill-mode: forwards;

    @keyframes showviewed {
      0% {
        height: auto;
        opacity: 1;
      }

      40% {
        transform: translateX(100%);
        height: auto;
        opacity: 0;
      }


      70% {
        height: auto;
        padding: 16px;
      }

      100% {
        height: 0;
        opacity: 0;
        transform: translateX(100%);
        padding: 0;
      }
    }
    `}
`

export const NotificationText = styled('div')`
  color: ${({ theme }) => theme.palette.grey[700]};
  font-size: 0.875rem;
`
