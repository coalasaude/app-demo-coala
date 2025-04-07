import { Button, ButtonGroup } from '@mui/material'
import React from 'react'

import { CButton } from '../../atoms/CButton'

import { CButtonGroupSplit } from './CButtonGroupSplit'

export type CButtonPrimary = 'basic' | 'split'
export type CButtonVariant = 'primary' | 'secondary'
export type CButtonOrientation = 'horizontal' | 'vertical'
export type CButtonSize = 'medium' | 'small'

export type CButtonGroupProps = {
  primary?: CButtonPrimary
  variant?: CButtonVariant
  orientation?: CButtonOrientation
  size?: CButtonSize
  selectedIndex?: number
  loading?: boolean
  children: React.ReactElement<typeof CButton> | React.ReactElement<typeof CButton>[]
}

export const mapVariant = new Map<string, 'contained' | 'outlined'>([
  ['primary', 'contained'],
  ['secondary', 'outlined'],
])

const CButtonGroup: React.FC<CButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  variant = 'primary',
  size = 'medium',
  primary = 'basic',
  selectedIndex,
  loading,
}: CButtonGroupProps) => {
  if (primary === 'split') {
    return (
      <CButtonGroupSplit loading={loading} variant={variant} orientation={orientation} size={size}>
        {Array.isArray(children) ? (
          children?.map((child, index) => (
            <Button
              key={index}
              {...child.props}
              sx={{
                ...(index === selectedIndex && {
                  boxShadow: 'none',
                  background: 'var(--mui-palette-primary-light)',
                }),
              }}
            />
          ))
        ) : (
          <Button {...(children.props as any)} />
        )}
      </CButtonGroupSplit>
    )
  }

  return (
    <ButtonGroup
      size={size}
      orientation={orientation}
      variant={mapVariant.get(variant)}
      disableElevation
      disabled={loading}
    >
      {Array.isArray(children) ? (
        children?.map((child, index) => (
          <Button
            key={index}
            {...child.props}
            sx={{
              ...(index === selectedIndex && {
                boxShadow: 'none',
                background: 'var(--mui-palette-primary-light)',
                borderColor: 'var(--mui-palette-primary-medium)',
              }),
            }}
          />
        ))
      ) : (
        <Button {...(children.props as any)} />
      )}
    </ButtonGroup>
  )
}

export default CButtonGroup
