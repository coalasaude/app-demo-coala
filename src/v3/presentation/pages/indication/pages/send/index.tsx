import { PageHeader } from '@/v3/presentation/newComponents'

import { StyledContainer } from '../../styles'

import IndicationForm from './components/form'

export default function SendIndicationPage() {
  return (
    <div>
      <PageHeader title='Indique a coala' />
      <StyledContainer>
        <IndicationForm />
      </StyledContainer>
    </div>
  )
}
