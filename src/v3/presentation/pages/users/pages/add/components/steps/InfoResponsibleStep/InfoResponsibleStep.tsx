import { Typography } from '@mui/material'

import CreateUserResponsibleSvg from '/public/assets/svg/User/Create/CreateUserResponsible.svg'

import { StepContainer } from '@/v3/presentation/components/CWizard/StepContainer'
import { FormPageButtons } from '@/v3/presentation/components/FormButtons'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'

import { BaseUserAddStepProps } from '../../../types'

export type InfoResponsibleStepProps = BaseUserAddStepProps

export const InfoResponsibleStep = ({ onSetData }: InfoResponsibleStepProps) => {
  const { nextStep, previousStep } = useCWizardUrlControlContext()
  const isLoading = false
  const onCancel = () => {
    previousStep?.()
  }

  const onConfirm = () => {
    onSetData?.({ responsible: [] })
    nextStep?.()
  }

  const onAddStudentWithAccess = () => {
    onSetData?.({ responsible: null })
    nextStep?.()
  }

  return (
    <StepContainer
      py={4}
      proportion='5/7'
      svg={CreateUserResponsibleSvg}
      gridProps={{ pr: undefined }}
      maxWidth={'710px'}
    >
      <Typography
        mx={['auto', 'auto', '0px']}
        textAlign={['center', 'center', 'start']}
        variant='h2'
      >
        Agora você pode começar <br />o cadastro pelos{' '}
        <Typography variant='h2' component={'span'} color='var(--mui-palette-primary-main)'>
          responsáveis!
        </Typography>
      </Typography>
      <br />
      <Typography
        mx={['auto', 'auto', '0px']}
        textAlign={['center', 'center', 'start']}
        variant='body1'
      >
        Se algum dos responsáveis já possuir um dependente cadastrado na Coala, ele será exibido e
        estará disponível para uma nova vinculação.
      </Typography>
      <br />
      <Typography
        mx={['auto', 'auto', '0px']}
        textAlign={['center', 'center', 'start']}
        variant='body1'
        mb={2}
      >
        Você também pode cadastrar um aluno sem responsáveis{' '}
        <Typography
          variant='body1'
          component={'span'}
          color='var(--mui-palette-primary-main)'
          onClick={onAddStudentWithAccess}
          sx={{ cursor: 'pointer' }}
        >
          clicando aqui.
        </Typography>
      </Typography>
      <FormPageButtons
        isLoading={isLoading}
        justifyContent={['center', 'center', 'flex-start']}
        onCancel={onCancel}
        onConfirm={onConfirm}
        minWidth={['100%', '140px']}
        cancelLabel='Voltar'
        confirmLabel='Próximo'
      />
    </StepContainer>
  )
}
