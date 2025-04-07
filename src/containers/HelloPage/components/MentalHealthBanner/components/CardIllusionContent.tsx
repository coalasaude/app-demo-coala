import { Box } from '@mui/material'

import { colorSchemaMap } from '../../../../../v3/presentation/constants/banner-color-schema-map'

type CardIllusionContentProps = {
  color: 'primary' | 'secondary'
}

export const CardIllusionContent: React.FC<CardIllusionContentProps> = ({ color }) => {
  return (
    <Box display='flex' height='100%' width='100%' sx={{ backgroundColor: 'white' }}>
      <Box
        display='flex'
        height='100%'
        width='100%'
        flex={1}
        sx={{
          backgroundImage: `url('${colorSchemaMap.ilussion[color]}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
    </Box>
  )
}
