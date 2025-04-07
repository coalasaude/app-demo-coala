import { Box } from '@mui/material'

type CylindricalShapeProps = {
  vertical?: boolean
  top?: number | string
  left?: number | string
  bottom?: number | string
  right?: number | string
  height?: number | string
}

export const CylindricalShape: React.FC<CylindricalShapeProps> = ({
  vertical,
  left,
  top,
  right,
  bottom,
  height,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--mui-palette-secondary-medium)',
        borderRadius: '10px',
        border: '1.5px solid white',
        height: vertical ? height || ['48px', '48px', '92px'] : ['16px', '16px', '22px'],
        width: vertical ? ['16px', '16px', '22px'] : ['48px', '48px', '92px'],
        position: 'absolute',
        top,
        left,
        right,
        bottom,
      }}
    />
  )
}
