import LaunchIcon from '@mui/icons-material/Launch'
import { Typography } from '@mui/material'
import NextLink from 'next/link'

import { spacing } from '../../utils/spacing'

import { StyledButton } from './style'

export interface CardLinkProps {
  label: string
  href: string
  icon?: React.ReactNode
  isActive?: boolean
}

export const CardLink = ({ label, href, icon = <LaunchIcon />, isActive }: CardLinkProps) => (
  <NextLink href={href}>
    <a target='_self' rel='noopener noreferrer'>
      <StyledButton sx={{ gap: [0, 1] }} isActive={!!isActive}>
        {icon}
        <Typography
          ml={icon ? [spacing(0.5), spacing(1)] : 0}
          fontWeight={700}
          fontSize={13}
          variant='body2'
          mt={['4px', 0]}
        >
          {label}
        </Typography>
      </StyledButton>
    </a>
  </NextLink>
)
