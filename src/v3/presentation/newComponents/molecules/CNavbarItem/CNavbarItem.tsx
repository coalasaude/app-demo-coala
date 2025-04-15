import { SvgIconComponent } from '@mui/icons-material'
import { Button, SxProps, Typography, Box } from '@mui/material'

import { CChipNew } from '../../layout/CChipNew'

interface CNavbarItemProps {
  text: string
  Icon: SvgIconComponent
  IconProps?: SxProps
  onClick: () => void
  isActive?: boolean
  isNew?: boolean
  id?: string
}

export const CNavbarItem: React.FC<CNavbarItemProps> = ({
  text,
  id,
  Icon,
  IconProps,
  onClick,
  isActive,
  isNew,
}) => (
  <Button
    id={id}
    variant='text'
    sx={{
      flex: 1,
      border: 'unset',
      ':hover': { boxShadow: 'none !important' },
      position: 'relative',
    }}
    color={isActive ? 'primary' : 'inherit'}
    onClick={onClick}
  >
    {isNew && (
      <CChipNew
        right='15px'
        top='-5px'
        sx={{
          borderRadius: '45px',
          width: '25px',
          height: '17px',
          justifyContent: 'center',
        }}
      />
    )}
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      position='relative'
      color={'#A6B0BF'}
    >
      <Icon
        sx={() => ({
          color: '#A6B0BF',
          ...(IconProps && {}),
          width: '43px',
          height: '43px'
        })}
      />
      <Typography
        textTransform='initial'
        fontWeight='normal'
        mt={0.5}
        sx={() => ({
          color: '#A6B0BF',
          fontSize: '20px !important'
        })}
      >
        {text}
      </Typography>
    </Box>
  </Button>
)
