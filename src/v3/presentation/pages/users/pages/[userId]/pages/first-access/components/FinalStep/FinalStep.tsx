import { Typography } from '@mui/material'

import FinalStepSvg from '/public/assets/svg/User/FirstAccess/FinalStep.svg'

import { StepContainer } from '@/v3/presentation/components/CWizard/StepContainer'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import PageTitle from '@/v3/presentation/newComponents/layout/PageTitle'

export type FinalStepProps = {
  onConfirm: () => Promise<void>
  onEnd?: () => Promise<void>
  isLoading?: boolean
}

export const FinalStep = ({ onConfirm, onEnd, isLoading }: FinalStepProps) => {
  return (
    <>
      <CBaseContainer
        mt={2}
        boxShadow='none'
        buttonLabel='Entendido!'
        cancelLabel='Preencher depois'
        isLoading={isLoading}
        buttonDisabled={isLoading}
        onConfirm={onConfirm}
        onCancel={onEnd}
        sx={{ px: 1, py: 2 }}
        bottomMargin={0}
      >
        <StepContainer
          py={4}
          gridProps={{ pr: 0, width: '100%' }}
          maxWidth='900px'
          proportion='4/8'
          svg={FinalStepSvg}
        >
          <Typography
            maxWidth={[380, 380, 520]}
            textAlign={['center', 'center', 'start']}
            variant='h3'
            mb={2}
            pl={[0, 0, 5]}
            mx={['auto', 'auto', 0]}
          >
            <PageTitle component='span' color='var(--mui-palette-primary-main)'>
              Parabéns!
            </PageTitle>{' '}
            <br />O primeiro passo do cuidado você já deu. Agora, é só manter as informações
            atualizadas.
          </Typography>
        </StepContainer>
      </CBaseContainer>
    </>
  )
}
