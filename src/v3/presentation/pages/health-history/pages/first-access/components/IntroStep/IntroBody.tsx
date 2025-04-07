import { Paper, Typography } from '@mui/material'

import IntroStepSvg from '/public/assets/svg/HealthHistoric/FirstAccess/IntroStep.svg'

import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { StepContainer } from '@/v3/presentation/components/CWizard/StepContainer'
import { FormPageButtons } from '@/v3/presentation/components/FormButtons'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

export type IntroBodyProps = {
  onConfirm: () => void
  onCancel?: () => void
  isLoading?: boolean
  student?: UserModel
}

export const IntroBody = ({ onCancel, onConfirm, isLoading, student }: IntroBodyProps) => {
  const { name, user } = useAuth()

  const articleString = `d${student?.getGenreArticle() || 'o'}`
  const studentName = student?.name || 'aluno'
  let lastTitlePhrase = `${articleString} ${studentName}`

  if (student && user?.id == student.id) {
    lastTitlePhrase = 'de você'
  } else if (student && student.name == name) {
    lastTitlePhrase = `d${student.getGenreArticle()} ${student.getFullName()}`
  }

  return (
    <Paper sx={{ boxShadow: 'none' }}>
      <StepContainer py={4} svg={IntroStepSvg}>
        <Typography
          mx={['auto', 'auto', '0px']}
          textAlign={['center', 'center', 'start']}
          maxWidth={'334px'}
          variant='h3'
          mb={4}
        >
          {name}, atualize os dados da {user?.id === student?.id && 'sua'} ficha de saúde e ajude a
          Coala a cuidar cada vez mais {lastTitlePhrase}!
        </Typography>
        <Typography
          maxWidth={'407px'}
          variant='body2'
          mb={[2, 4]}
          mx={['auto', 'auto', '0px']}
          textAlign={['center', 'center', 'start']}
        >
          As informações que você insere na{' '}
          {user?.id === student?.id
            ? 'sua ficha de saúde são essenciais para ajudar a Coala a te conhecer melhor e a oferecer um atendimento de qualidade na hora do aperto'
            : `ficha de saúde ${lastTitlePhrase} são essenciais para ajudar a Coala a oferecer um atendimento de
            qualidade na hora do aperto.`}{' '}
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
