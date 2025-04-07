import { Box } from '@mui/material'
import { ReactNode } from 'react'

import { SchemaTypeEnum } from '@/v3/presentation/enums/schema-types.enum'

import { CStatus } from '../CStatus'

import { StyledContainer, StyledDescription, StyledTextStack, StyledTitle } from './styles'

interface Experimental_CTicketProps {
  title: string
  description?: ReactNode
  descriptionName?: string
  descriptionDate?: string
  status?: 'active' | 'inactive'
  selected: boolean
  onClick?: () => void
  icon?: React.ReactNode
  disabled?: boolean
  color?: string
}

const getComponentColor = (disabled?: boolean, color?: string) =>
  disabled && !color ? 'var(--mui-palette-grey-400)' : color || ''

export const Experimental_CTicket = (props: Experimental_CTicketProps) => {
  const hasIcon = !!props?.icon
  const componentColor = getComponentColor(props?.disabled, props?.color)

  return (
    <StyledContainer
      onClick={props.disabled ? undefined : props.onClick}
      selected={props.selected}
      isClickable={!props.disabled && !!props.onClick}
      componentColor={componentColor}
    >
      {hasIcon && <Box>{props.icon}</Box>}
      <StyledTextStack marginLeft={hasIcon ? 1 : 0} color={componentColor}>
        <Box display='flex' width='100%' justifyContent='space-between'>
          <StyledTitle componentColor={componentColor} noWrap data-testid='registerCardTitle'>
            {props.title}
          </StyledTitle>
          {props.status && (
            <Box mb={1}>
              <CStatus
                label={props.status === 'active' ? 'Válido' : 'Inválido'}
                type={props.status === 'active' ? SchemaTypeEnum.SUCCESS : SchemaTypeEnum.NEUTRAL}
                variant='badge'
              />
            </Box>
          )}
        </Box>
        {!props.description && props.descriptionName && props.descriptionDate && (
          <Box width='100%' display='flex' flexDirection='column'>
            <StyledDescription
              componentColor={componentColor}
              noWrap
              textOverflow='ellipsis'
              overflow='hidden'
              width='90%'
            >
              {props.descriptionName}
            </StyledDescription>
            <StyledDescription componentColor={componentColor} noWrap>
              {props.descriptionDate}
            </StyledDescription>
          </Box>
        )}

        {props.description && (
          <Box textOverflow='ellipsis' overflow='hidden' width='100%'>
            <StyledDescription componentColor={componentColor} noWrap>
              {props.description}
            </StyledDescription>
          </Box>
        )}
      </StyledTextStack>
    </StyledContainer>
  )
}
