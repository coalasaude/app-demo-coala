import {
  Box,
  BoxProps,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  StepperProps,
  SxProps,
  Typography,
} from '@mui/material'
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import ErrorIcon from '@mui/icons-material/Error'

import useMediaQuery from '@/hooks/useMediaQuery'
import { theme } from '@/theme'

export interface CStepperProps<T extends string | number> {
  steps: string[]
  optionalsLabels?: string[]
  activeStep: T
  renderHeader?: () => React.ReactNode
  children: React.ReactElement<{ key?: T }>[]
  boxProps?: BoxProps
  noPadding?: boolean
  isStepError?: (label: string, index: number) => boolean
  stepProps?: StepperProps
  connectorProps?: SxProps
}

export interface CStepperRefProps<T extends string | number> {
  nextStep: () => void
  prevStep: () => void
  hasPrev: () => void
  hasNext: () => void
  getNextStep: () => T
  getPrevStep: () => T
}

export function CStepperComponent<T extends string | number>(
  {
    renderHeader,
    steps,
    activeStep: step,
    children,
    boxProps,
    noPadding,
    isStepError,
    optionalsLabels,
    stepProps,
    connectorProps,
  }: CStepperProps<T>,
  ref: ForwardedRef<CStepperRefProps<T>>,
) {
  const [activeStep, setActiveStep] = useState(step)
  const isTablet = useMediaQuery('md')
  const isSmallDevice = useMediaQuery('sm')

  const mobileBreakPoint = theme.breakpoints.down('sm')
  const ssxBreakPoint = theme.breakpoints.down(375)

  const { index, child } = useMemo(() => {
    const index = children.findIndex(
      (child, index) => (child.key != undefined ? child.key : index) === activeStep,
    )

    if (index === -1) {
      return { child: children[0], index: 0 }
    } else {
      return { child: children[index], index }
    }
  }, [children, activeStep])

  useEffect(() => {
    if (step != activeStep) {
      setActiveStep(step)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  useImperativeHandle(ref, () => ({
    hasPrev: () => index > 0,
    hasNext: () => index < children.length - 1,
    nextStep: () => {
      if (index < children.length - 1) {
        return setActiveStep(children[index + 1].key as T)
      }
    },
    prevStep: () => {
      if (index > 0) {
        return setActiveStep(children[index - 1].key as T)
      }
    },
    getNextStep: () => {
      if (index < children.length - 1) {
        return children[index + 1].key as T
      }

      return children[children.length - 1].key as T
    },
    getPrevStep: () => {
      if (index > 0) {
        return children[index - 1].key as T
      }

      return children[0].key as T
    },
  }))

  return (
    <>
      {renderHeader?.()}
      <Box {...boxProps}>
        <Stepper
          activeStep={index}
          alternativeLabel={isTablet}
          connector={<StepConnector sx={connectorProps} />}
          sx={{
            pt: noPadding ? 0 : 2,
            px: noPadding ? 0 : [3, 7, 10],
            overflowX: isSmallDevice ? 'scroll' : 'hidden',
            svg: {
              width: '23px',
              height: '25px',
            },
            ...(isTablet && {
              '.MuiStepConnector-root': {
                top: 0,
              },
              '.MuiStepConnector-root span': {
                borderColor: 'transparent',
              },
            }),
            [mobileBreakPoint]: {
              svg: {
                width: '20px',
                height: '20px',
              },
            },
            [ssxBreakPoint]: {
              px: 0,
            },
            justifyContent: 'center',
          }}
          {...stepProps}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <Box>
                <StepLabel
                  error={isStepError?.(label, index)}
                  icon={isStepError?.(label, index) ? <ErrorIcon color='error' /> : undefined}
                >
                  <Box display='flex' flexDirection='column'>
                    <Typography variant='body2' color='var(--mui-palette-grey-600)'>
                      {label}
                    </Typography>
                    <Typography variant='caption' color='var(--mui-palette-grey-600)'>
                      {optionalsLabels?.[index]}
                    </Typography>
                  </Box>
                </StepLabel>
              </Box>
            </Step>
          ))}
        </Stepper>
        {child}
      </Box>
    </>
  )
}

export const CStepper = forwardRef(CStepperComponent) as <T extends string | number>(
  props: CStepperProps<T> & { ref?: ForwardedRef<CStepperRefProps<T>> },
) => JSX.Element
