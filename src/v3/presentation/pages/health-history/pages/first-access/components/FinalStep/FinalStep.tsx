import { Typography } from '@mui/material'

import FinalStepSvg from '/public/assets/svg/HealthHistoric/FirstAccess/FinalStep.svg'

import { spacing } from '@/utils/spacing'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { StepContainer } from '@/v3/presentation/components/CWizard/StepContainer'
import { FormPageButtons } from '@/v3/presentation/components/FormButtons'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

export type FinalStepProps = {
  onConfirm: () => Promise<void>
  isLoading?: boolean
  user: UserModel
}

export const FinalStep = ({ user, onConfirm, isLoading }: FinalStepProps) => {
  const userId = user.id
  const { auth } = useAuth()

  return (
    <StepContainer svg={FinalStepSvg}>
      <Typography
        mx={['auto', 'auto', '0px']}
        textAlign={['center', 'center', 'start']}
        maxWidth={'334px'}
        variant='h1'
        mb={spacing(2)}
      >
        <Typography variant='h1' component='span' color='var(--mui-palette-primary-main)'>
          Parabéns!
        </Typography>{' '}
        <br />
        Você chegou ao final do preenchimento{' '}
        {auth?.userId === userId
          ? 'de sua ficha de saúde'
          : `da ficha d${user.getGenreArticle()} ${user.name}`}{' '}
        e agora as informações inseridas poderão ser acompanhadas de perto pelo nosso time de saúde.
      </Typography>
      <FormPageButtons
        isLoading={isLoading}
        justifyContent={['center', 'center', 'flex-start']}
        onConfirm={onConfirm}
        fullWidth
        minWidth={['100%', '262px']}
        confirmLabel='Ver ficha de saúde'
      />
    </StepContainer>
  )
}
