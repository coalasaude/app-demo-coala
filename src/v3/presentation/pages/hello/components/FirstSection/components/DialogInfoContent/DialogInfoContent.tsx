import { Box, Skeleton, Typography } from '@mui/material'
import { ReactNode } from 'react'

import { DialogInfoEnum } from '@/v3/domain/@v2/dashboard/enum/dialog-info.enum'
import { useFetchGetDialogInfo } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchGetDialogInfo'

import DialogContact from '/public/assets/svg/HelloPage/Dialog/DialogContact.svg'
import DialogHealthHistory from '/public/assets/svg/HelloPage/Dialog/DialogHealthHistory.svg'
import DialogActivation from '/public/assets/svg/HelloPage/Dialog/DialogActivation.svg'

type ContentMapType = Record<
  DialogInfoEnum,
  {
    title: string
    content: string
    image: ReactNode
    url?: string
  }
>

const contentMap: ContentMapType = {
  [DialogInfoEnum.ACTIVATED_USERS]: {
    title: 'Ativação',
    content:
      'Alguns responsáveis ainda não ativaram suas contas. Incentive a ativação, isso ajuda muito na hora de realizar os atendimento 😊',
    image: <DialogActivation />,
  },
  [DialogInfoEnum.DEPENDENTS]: {
    title: 'Falta pouco!',
    content: 'Seus dependentes ainda não estão com a ficha de saúde preenchida!',
    image: <DialogHealthHistory />,
  },
  [DialogInfoEnum.HEALTH_HISTORY]: {
    title: 'Ficha de saúde',
    content:
      'Incentive os responsáveis a preencherem ficha de saúde, isso ajuda muito na hora dos atendimentos 💜',
    image: <DialogHealthHistory />,
  },
  [DialogInfoEnum.DEFAULT]: {
    title: 'Está tendo alguma dificuldades?',
    content: 'Vem dar uma olhada na nossa central de ajuda 💜',
    image: <DialogContact style={{ height: '100%' }} />,
    url: 'https://sites.google.com/coalasaude.com.br/central-de-ajuda/p%C3%A1gina-inicial?authuser=0',
  },
}

export const DialogInfoContent = ({ institutionId }: { institutionId: number }) => {
  const { data, isLoading } = useFetchGetDialogInfo({ institutionId })

  const content = contentMap[data || DialogInfoEnum.DEFAULT]

  const handleClick = () => {
    if (content.url) {
      window.open(content.url, '_blank')
    }
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        gap: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        px: ['28px', '28px', '28px', '60px'],
        py: '10px',
        backgroundColor: 'var(--mui-palette-primary-light)',
        cursor: content.url ? 'pointer' : 'default',
      }}
      height={['142px', '210px']}
    >
      {isLoading && <Skeleton variant='rectangular' width='100%' height={'100%'} />}

      {content.image}
      <Box maxWidth={[192]}>
        <Typography variant='h3' color='var(--mui-palette-primary-main)'>
          {content.title}
        </Typography>
        <Typography variant='body1' color='var(--mui-palette-primary-main)'>
          {content.content}
        </Typography>
      </Box>
    </Box>
  )
}
