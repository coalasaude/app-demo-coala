import { Box, Typography } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

import { CMenu } from '@/v3/presentation/newComponents'

interface PeiPdiTitleProps {
  title: string
  percentValue: string | number
  onEditPeiPdi?: () => void
  onDeletePeiPdi?: () => void
}

const PeiPdiTitle = ({ title, percentValue, onEditPeiPdi, onDeletePeiPdi }: PeiPdiTitleProps) => {
  return (
    <Box
      display='flex'
      flexDirection={['column', 'row']}
      alignItems={['flex-start', 'center']}
      justifyContent={['flex-start', 'space-between']}
      width='100%'
      gap={1}
    >
      <Box display='flex' alignItems='center' gap={1}>
        <Typography variant='h2'>{title}</Typography>
        <CMenu
          actionComponent={
            <MoreVertOutlinedIcon
              sx={{
                color: 'var(--mui-palette-grey-500)',
                width: 16,
                height: 16,
                zIndex: 999,
                mt: 1,
              }}
            />
          }
          items={[
            {
              children: (
                <Box
                  display='flex'
                  alignItems='center'
                  width='100%'
                  gap={2}
                  px={2}
                  py={1}
                  onClick={onEditPeiPdi}
                >
                  <Typography variant='body2'>Editar</Typography>
                </Box>
              ),
            },
            {
              children: (
                <Box
                  display='flex'
                  alignItems='center'
                  width='100%'
                  gap={2}
                  px={2}
                  py={1}
                  onClick={onDeletePeiPdi}
                >
                  <Typography variant='body2'>Excluir</Typography>
                </Box>
              ),
            },
          ]}
        />
      </Box>
      <Box display='flex' alignItems='center' gap={1} mr={1}>
        <Typography variant='h5' color='var(--mui-palette-primary-main)'>
          {percentValue}% concluído
        </Typography>
      </Box>
    </Box>
  )
}

export default PeiPdiTitle
