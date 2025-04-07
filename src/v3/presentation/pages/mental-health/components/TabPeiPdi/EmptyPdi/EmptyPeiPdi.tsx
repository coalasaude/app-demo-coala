import { Box, Stack, Typography } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

import EmptyPeiPdiSvg from 'public/assets/svg/MentalHealth/EmptyPeiPdiSvg.svg'
import useMediaQuery from '@/hooks/useMediaQuery'
import { CButton } from '@/v3/presentation/newComponents'

interface EmptyPeiPdiProps {
  onClick?: () => void
  canCreateWithAi?: boolean
}

const EmptyPeiPdi = ({ onClick, canCreateWithAi }: EmptyPeiPdiProps) => {
  const isMobile = useMediaQuery('sm')

  const titleText = canCreateWithAi
    ? 'Crie seu PEI/PDI com IA em poucos cliques'
    : 'Crie seu PEI/PDI em poucos cliques'

  const descriptionText = canCreateWithAi
    ? 'Crie planos de estudo personalizados em minutos com a ajuda da nossa IA. Sua educação, mais inteligente e eficiente.'
    : 'Crie planos de estudo personalizados em minutos. Sua educação, mais inteligente e eficiente.'

  const buttonContent = canCreateWithAi ? (
    <>
      <AutoAwesomeIcon sx={{ width: 18, height: 18 }} />
      Criar plano com IA
    </>
  ) : (
    'Criar plano'
  )

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      width='100%'
      justifyContent='center'
      alignItems='center'
      gap={isMobile ? 2 : 5}
      px={2}
      py={isMobile ? 3 : 5}
      pb={isMobile ? 2 : 5}
      border='2px solid var(--mui-palette-grey-200)'
      borderRadius={2}
    >
      <Box maxWidth={270} textAlign='left'>
        <Typography variant='h1' color={(theme) => theme.palette.primary.dark}>
          {titleText}
        </Typography>

        <Typography variant='body1' color={(theme) => theme.palette.primary.dark} mt={1}>
          {descriptionText}
        </Typography>
        {!isMobile && onClick && (
          <Box mt={3}>
            <CButton
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
              onClick={onClick}
            >
              {buttonContent}
            </CButton>
          </Box>
        )}
      </Box>
      <EmptyPeiPdiSvg
        style={{
          width: isMobile ? '100%' : 341,
        }}
      />
    </Stack>
  )
}

export default EmptyPeiPdi
