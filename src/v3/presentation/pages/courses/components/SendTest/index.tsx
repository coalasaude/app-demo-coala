import { Button, Typography } from '@mui/material'

import { CDivider } from '@/v3/presentation/newComponents'

import { StyledButtonContainer } from '../StartBody/style'
import { StyledQuizResultContainer, StyledQuizScoreContainer } from '../QuizResult/style'
import { StyledFinalTestHeader, StyledWrapperTitles } from '../../pages/finalTest/style'

export const SendTest = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <StyledQuizResultContainer>
      <StyledFinalTestHeader>
        <StyledWrapperTitles>
          <h2>Avaliação Final</h2>
          <h1>Parabéns por concluir sua avaliação!</h1>
        </StyledWrapperTitles>
      </StyledFinalTestHeader>
      <StyledQuizScoreContainer>
        <Typography sx={{ marginLeft: '16px', marginBottom: '8px' }}>
          Agora é hora de enviar suas respostas. Confira seu desempenho à seguir.
        </Typography>
        <Typography sx={{ marginLeft: '16px', marginBottom: '8px' }}>Boa sorte.</Typography>
      </StyledQuizScoreContainer>
      <CDivider />
      <StyledButtonContainer>
        <Button variant='contained' onClick={handleClick}>
          Enviar Avaliação
        </Button>
      </StyledButtonContainer>
    </StyledQuizResultContainer>
  )
}
