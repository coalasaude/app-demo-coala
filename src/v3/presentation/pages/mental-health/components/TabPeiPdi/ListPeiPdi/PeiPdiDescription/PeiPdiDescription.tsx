import { Box, Typography } from '@mui/material'

import { GridItem, GridWrapper } from '@/components/Grid'
import { CTooltip } from '@/v3/presentation/newComponents'

interface PeiPdiDescriptionProps {
  responsibleCollaboratorName: string
  frequency: string
  duration: string
  weekDays: string
  generalGoal: string
}

const PeiPdiDescription = ({
  responsibleCollaboratorName,
  frequency,
  duration,
  weekDays,
  generalGoal,
}: PeiPdiDescriptionProps) => {
  return (
    <Box display='flex' flexDirection='column' gap={2} width='100%'>
      <GridWrapper>
        <GridItem
          xs={12}
          md={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            variant='caption'
            color='var(--mui-palette-grey-500)'
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            Colaborador responsável:{' '}
          </Typography>
          <CTooltip description={responsibleCollaboratorName}>
            <Typography
              variant='caption'
              fontWeight='bold'
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {responsibleCollaboratorName}
            </Typography>
          </CTooltip>
        </GridItem>
        <GridItem xs={12} md={3}>
          <Typography variant='caption' color='var(--mui-palette-grey-500)'>
            Frequência semanal:{' '}
          </Typography>
          <Typography variant='caption' fontWeight='bold'>
            {frequency}
          </Typography>
        </GridItem>
        <GridItem xs={4} md={1.5}>
          <Typography variant='caption' color='var(--mui-palette-grey-500)'>
            Duração:{' '}
          </Typography>
          <Typography variant='caption' fontWeight='bold'>
            {duration}
          </Typography>
        </GridItem>
        <GridItem xs={8} md={2.5}>
          <Typography variant='caption' color='var(--mui-palette-grey-500)'>
            Dias da semana:{' '}
          </Typography>
          <Typography variant='caption' fontWeight='bold'>
            {weekDays}
          </Typography>
        </GridItem>
      </GridWrapper>
      <Box maxWidth='80%'>
        <Typography variant='caption' color='var(--mui-palette-grey-500)'>
          Objetivos gerais
        </Typography>
        <Typography variant='body2'>{generalGoal}</Typography>
      </Box>
    </Box>
  )
}

export default PeiPdiDescription
