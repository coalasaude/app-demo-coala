import { Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import { GridItem, GridWrapper } from '@/components/Grid'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { StepContainerInfo } from '@/v3/presentation/components/CWizard/StepContainer/StepContainerInfo'
import SlideRulerInput from '@/v3/presentation/components/SlideRulerInput'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'

export type FormStepProps = {
  user: UserModel
  setHeight: Dispatch<SetStateAction<number>>
}

export const HeightStep = ({ user, setHeight }: FormStepProps) => {
  const { nextStep } = useCWizardUrlControlContext()
  const userId = user.id
  const { auth } = useAuth()

  return (
    <CBaseContainer boxShadow='none' buttonLabel='Próximo' mt={4} onConfirm={() => nextStep?.()}>
      <GridWrapper>
        <GridItem xs={12} display='flex' justifyContent='center'>
          <Typography variant='h4' mb={1}>
            Qual é a{' '}
            {auth?.userId === userId
              ? 'sua altura?'
              : `altura d${user.getGenreArticle()} ${user.name}?`}
          </Typography>
        </GridItem>
        <GridItem xs={12}>
          <SlideRulerInput
            variant='height'
            labelSuffix='cm'
            initialValue={112}
            onChange={(height: number) => setHeight(height)}
          />
        </GridItem>
      </GridWrapper>
      <StepContainerInfo mt={4} display='flex' justifyContent='center'>
        Não se preocupe em inserir a altura com exatidão, essa informação poderá ser atualizada
        depois.
      </StepContainerInfo>
    </CBaseContainer>
  )
}
