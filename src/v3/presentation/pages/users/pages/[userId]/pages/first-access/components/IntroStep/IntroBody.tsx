import { Typography } from '@mui/material'
import Router from 'next/router'

import IntroStepSvg from '/public/assets/svg/User/FirstAccess/IntroStep.svg'

import { Genre } from '@/types/genre'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { StepContainer } from '@/v3/presentation/components/CWizard/StepContainer'
import { FormPageButtons } from '@/v3/presentation/components/FormButtons'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import Paper from '@/v3/presentation/components/Paper'

export type IntroBodyProps = {
  onConfirm: () => void
  onCancel?: () => void
  isLoading?: boolean
  student?: UserModel
}

export const IntroBody = ({ onCancel, onConfirm, isLoading, student }: IntroBodyProps) => {
  const { auth } = useAuth()
  const { userId } = Router.query
  const articleString = `d${student?.getGenreArticle() || 'o'}`
  const studentName = student?.name || 'aluno'

  const copy = `O primeiro passo para cuidar da ${
    auth?.userId === Number(userId) ? `sua saúde` : `saúde ${articleString} ${studentName} `
  } é atualizar os ${auth?.userId === Number(userId) ? 'seus dados' : `dados del${student?.genre === Genre.Feminino ? 'a' : 'e'}`}! Leva menos de 2 minutos!`

  return (
    <Paper sx={{ boxShadow: 'none', border: 'none' }}>
      <StepContainer py={4} svg={IntroStepSvg} gridProps={{ pr: undefined }}>
        <Typography
          mx={['auto', 'auto', '0px']}
          textAlign={['center', 'center', 'start']}
          maxWidth={'350px'}
          variant='h3'
          mb={4}
        >
          {copy}
        </Typography>
        <FormPageButtons
          isLoading={isLoading}
          justifyContent={['center', 'center', 'flex-start']}
          onCancel={onCancel}
          onConfirm={onConfirm}
          minWidth={['100%', '140px']}
          cancelLabel='Agora não'
          confirmLabel='Ok, vamos lá!'
        />
      </StepContainer>
    </Paper>
  )
}
