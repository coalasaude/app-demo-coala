import React, { useState } from 'react'
import { ButtonGroup, MenuList, Popper, ClickAwayListener, Grow } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import Paper from '@/v3/presentation/components/Paper'

import { CButton } from '../../atoms/CButton'
import { CButtonProps } from '../../atoms/CButton/CButton'
import { CMenuItem } from '../../atoms'

import { CButtonGroupProps, mapVariant } from './CButtonGroup'

export const CButtonGroupSplit: React.FC<CButtonGroupProps> = ({
  children,
  size = 'medium',
  orientation = 'horizontal',
  variant = 'primary',
  loading,
}: CButtonGroupProps) => {
  const buttons = React.Children.toArray(children) as React.ReactElement<CButtonProps>[]

  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const anchorRef = React.useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setIsOpen(false)
  }

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index)
    setIsOpen(false)
  }

  return (
    <ButtonGroup
      disabled={loading}
      size={size}
      orientation={orientation}
      variant={mapVariant.get(variant)}
      disableElevation
      ref={anchorRef}
    >
      {loading ? <CButton disabled={true}>Carregando...</CButton> : buttons[selectedIndex]}

      <CButton
        disabled={loading}
        variant={variant}
        size={size}
        onClick={handleToggle}
        sx={{ borderRadius: '0 4px 4px 0 !important' }}
      >
        <ArrowDropDownIcon />
      </CButton>
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        sx={{ zIndex: 1 }}
        placement='bottom-start'
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper mt={1}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {buttons.map((button, index) => (
                    <>
                      <CMenuItem
                        key={button.key}
                        onClick={() => {
                          handleMenuItemClick(index)
                          button.props.onClick?.()
                        }}
                        selected={index == selectedIndex}
                        sx={{ px: 2, py: 1 }}
                        hasDivider={index !== buttons.length - 1}
                      >
                        {button.props.children}
                      </CMenuItem>
                    </>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ButtonGroup>
  )
}
