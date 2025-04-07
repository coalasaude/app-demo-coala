/* eslint-disable no-console */
import { forwardRef } from 'react'
import CircleIcon from '@mui/icons-material/Circle'

import Canvas from './Canvas'
import styles from './data/styles'
import { Axis, MarkStyle, NumberStyle, SlideRuleProps } from './data/type'
const DEFAULT_X_AXIS_HEIGHT_PROPS: SlideRuleProps = {
  width: 300,
  height: 110,
  cursor: (
    <div
      style={{ width: 8, height: 35, backgroundColor: '#FFFFFF', borderRadius: '0 0 25px 25px' }}
    />
  ),
  markStyle: { color: 'var(--mui-palette-grey-400)', width: 3, height: 30, top: 0 },
  smallerMarkStyle: {
    color: 'var(--mui-palette-grey-400)',
    width: 2,
    height: 15,
    top: 0,
  },
  numberStyle: {
    size: '1.25em',
    family: 'Outfit,Roboto',
    color: 'rgba(0, 0, 0, 0.87)',
    top: 36,
    textAlign: 'center',
    textBaseline: 'top',
    rotate: 0,
  },
  pointers: [],
}

const DEFAULT_X_AXIS_WEIGHT_PROPS: SlideRuleProps = {
  width: 300,
  height: 140,
  cursor: (
    <div
      style={{
        width: 8,
        height: 120,
        backgroundColor: 'black',
        borderRadius: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircleIcon sx={{ width: '20px' }} />
    </div>
  ),
  markStyle: { color: 'var(--mui-palette-grey-400)', width: 3, height: 58, top: 20 },
  smallerMarkStyle: {
    color: 'var(--mui-palette-grey-400)',
    width: 2,
    height: 15,
    top: 50,
  },
  numberStyle: {
    size: '1.25em',
    family: 'Outfit,Roboto',
    color: 'var(--mui-palette-grey-400)',
    top: 86,
    textAlign: 'center',
    textBaseline: 'top',
    rotate: 0,
  },
  pointers: [],
}

const _isXAxis = (axis: Axis): boolean => axis === 'x' || axis === 'x-reverse'

const _getOrMerge = (
  source: MarkStyle | NumberStyle = {},
  target?: MarkStyle | NumberStyle
): MarkStyle | NumberStyle => {
  try {
    return target ? { ...source, ...target } : source
  } catch (e) {
    return source
  }
}

const SlideRule = forwardRef<HTMLDivElement, SlideRuleProps & { variant: 'weight' | 'height' }>(
  function SlideRule(props, ref) {
    const {
      onChange = (v: number) => v,
      gap = 10,
      step = 1,
      max = 300,
      min = 0,
      value = 150,
      axis = 'x',
      markStyle,
      smallerMarkStyle,
      numberStyle,
      unit = '',
      style,
      showWarning = false,
      pointers = [],
      ...rest
    } = props

    if (showWarning) validate({ value, min, max, step })

    const defaults =
      rest.variant === 'height' ? DEFAULT_X_AXIS_HEIGHT_PROPS : DEFAULT_X_AXIS_WEIGHT_PROPS

    const {
      width = defaults.width || 0,
      height = defaults.height || 0,
      cursor = defaults.cursor,
    } = rest
    return (
      <div ref={ref} style={styles.createRootStyle(style)}>
        <Canvas
          onChange={onChange}
          gap={gap}
          step={step}
          max={max}
          min={min}
          value={value}
          axis={axis}
          markStyle={_getOrMerge(defaults.markStyle, markStyle)}
          smallerMarkStyle={_getOrMerge(defaults.smallerMarkStyle, smallerMarkStyle)}
          numberStyle={_getOrMerge(defaults.numberStyle, numberStyle) as NumberStyle}
          width={width}
          height={height}
          unit={unit}
          pointers={pointers}
        />
        <div style={styles.createCenterStyle(_isXAxis(axis))}>{cursor}</div>
      </div>
    )
  }
)

export default SlideRule

function validate(options: { value: number; min: number; max: number; step: number }) {
  const { value, min, max, step } = options
  if (typeof value !== 'number') console.warn('value prop should be number!')
  if (!Number.isInteger(min / step)) console.warn('min prop should be a multiple of the step prop')
  if (!Number.isInteger(max / step)) console.warn('max prop should be a multiple of the step prop')
  if (!Number.isInteger(value / step))
    console.warn('value prop should be a multiple of the step prop')
}
