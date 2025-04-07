import { Button } from '@mui/material'
import Router from 'next/router'

import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { CDivider } from '@/v3/presentation/newComponents'

import { StyledButtonContainer } from '../StartBody/style'

import {
  ResultTypography,
  StyledQuizResultContainer,
  StyledQuizScore,
  StyledQuizScoreContainer,
  StyledQuizScoreText,
  StyledQuizScoreValueContainer,
} from './style'

export const QuizResult = ({ result }: any) => {
  return (
    <StyledQuizResultContainer>
      <ResultTypography>Resultado:</ResultTypography>
      <StyledQuizScoreContainer>
        <StyledQuizScore>
          <StyledQuizScoreValueContainer isErros={false}>
            {result.totalRightAnswers}
          </StyledQuizScoreValueContainer>
          <StyledQuizScoreText>Acertos</StyledQuizScoreText>
        </StyledQuizScore>
        <StyledQuizScore>
          <StyledQuizScoreValueContainer isErros={true}>
            {result.totalWrongAnswers}
          </StyledQuizScoreValueContainer>
          <StyledQuizScoreText>Erros</StyledQuizScoreText>
        </StyledQuizScore>
      </StyledQuizScoreContainer>
      <CDivider />
      <StyledButtonContainer>
        <Button
          variant='contained'
          onClick={() =>
            Router.push(
              bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.MODULES.path, {
                id: String(Router.query.id),
              }),
            )
          }
        >
          Ir para módulos
        </Button>
        <Button variant='outlined' onClick={() => Router.reload()}>
          Repetir Quiz
        </Button>
      </StyledButtonContainer>
    </StyledQuizResultContainer>
  )
}
