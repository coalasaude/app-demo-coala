import { Typography } from '@mui/material'

import { CTooltip } from '../../atoms'

import { StyledCMenuPanelContainer } from './styles'

export interface CComponentProps {
  type?: 'small' | 'large'
  icon: React.ReactNode
  label?: string
  isSelected?: boolean
  onClick?: () => void
}

export const CMenuPanel = ({
  type = 'large',
  icon,
  isSelected,
  label,
  onClick,
}: CComponentProps) => {
  const itemsColor = isSelected
    ? 'var(--mui-palette-primary-light)'
    : 'var(--mui-palette-primary-main)'
  return (
    <CTooltip description={label || ''}>
      <StyledCMenuPanelContainer
        isSelected={isSelected}
        color={itemsColor}
        onClick={onClick}
        isSmall={type === 'small'}
      >
        {icon}
        {type === 'large' && (
          <Typography variant='h5' color={itemsColor}>
            {label}
          </Typography>
        )}
      </StyledCMenuPanelContainer>
    </CTooltip>
  )
}
