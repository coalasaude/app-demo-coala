import React from 'react'
import { AccordionDetails, AccordionProps, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionSummary } from '@mui/material'

import { CDivider } from '@/v3/presentation/newComponents'

import { IconContainer, SAccordionTextWrapper } from './styles'

export interface CAccordionProps {
  icon?: React.ReactNode
  color?: string
  fontWeight?: string
  endComponent?: React.ReactNode
  title: JSX.Element | string
  subtitle?: JSX.Element | string
  withDivider?: boolean
  children?: React.ReactNode
  expanded?: AccordionProps['expanded']
  defaultExpanded?: AccordionProps['defaultExpanded']
  onChange?: AccordionProps['onChange']
  sx?: AccordionProps['sx']
}

export const CAccordion = ({
  icon,
  color,
  fontWeight,
  endComponent,
  title,
  subtitle,
  children,
  withDivider = false,
  ...rest
}: CAccordionProps) => {
  return (
    <Accordion {...rest}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {icon && <IconContainer>{icon}</IconContainer>}
        <SAccordionTextWrapper>
          {typeof title === 'string' ? (
            <Typography fontWeight={fontWeight} color={color} variant='h5'>
              {title}
            </Typography>
          ) : (
            title
          )}
          {typeof subtitle === 'string' ? (
            <Typography variant='body2' color='var(--mui-palette-grey-600)'>
              {subtitle}
            </Typography>
          ) : (
            subtitle
          )}
        </SAccordionTextWrapper>
        {endComponent}
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <>
          {withDivider && <CDivider sx={{ mb: 1 }} />}
          {children}
        </>
      </AccordionDetails>
    </Accordion>
  )
}
