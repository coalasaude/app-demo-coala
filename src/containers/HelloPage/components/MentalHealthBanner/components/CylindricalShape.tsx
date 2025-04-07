import { Box } from '@mui/material'

type CylindricalShapeProps = {
  vertical?: boolean
  top?: number | string
  left?: number | string
  bottom?: number | string
  right?: number | string
}

export const CylindricalShape: React.FC<CylindricalShapeProps> = ({
  vertical,
  left,
  top,
  right,
  bottom,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--mui-palette-secondary-medium)',
        borderRadius: '8px',
        border: '1.5px solid white',
        height: vertical ? '40px' : '14px',
        width: vertical ? '14px' : '40px',
        position: 'absolute',
        top,
        left,
        right,
        bottom,
      }}
    />
  )
}
