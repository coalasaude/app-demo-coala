import { Box, Button, Typography } from '@mui/material'

import { colorSchemaMap } from '../../../../../v3/presentation/constants/banner-color-schema-map'

type ContainerBackgroundGridProps = {
  color: 'primary' | 'secondary'
  text: string
  buttonText: string
  onActionClick: () => void
  isModal?: boolean
  hideOnTablet?: boolean
}

export const CardActionText: React.FC<ContainerBackgroundGridProps> = ({
  color,
  text,
  buttonText,
  onActionClick,
  isModal,
  hideOnTablet,
}) => {
  return (
    <Box
      px={isModal ? [3, 1] : [2, 2, 5, 3]}
      display={hideOnTablet ? ['none', 'none', 'none', 'flex'] : 'flex'}
      height={isModal ? undefined : ['49px', '49px', '49px', '64px']}
      flexDirection={isModal ? 'column' : 'row'}
      alignItems={isModal ? ['flex-start', 'center'] : 'center'}
      width='100%'
      gap={isModal ? '8px' : '21px'}
      justifyContent={
        isModal ? 'center' : ['space-between', 'space-between', 'space-between', 'center']
      }
      sx={{ backgroundColor: colorSchemaMap.medium[color] }}
    >
      <Typography
        color='white'
        fontSize={14}
        fontWeight={600}
        maxWidth={[121, undefined, isModal ? undefined : '100%']}
      >
        {text}
      </Typography>
      <Button
        sx={{
          backgroundColor: colorSchemaMap.button[color],
          fontSize: isModal ? '10px !important' : '12px !important',
          height: 22,
          borderRadius: '5px',
          minWidth: isModal ? '135px' : 'fit-content',
          '&:hover': { backgroundColor: colorSchemaMap.button[color] },
        }}
        size='small'
        onClick={onActionClick}
      >
        {buttonText}
      </Button>
    </Box>
  )
}
