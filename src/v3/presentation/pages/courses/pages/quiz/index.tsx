import { Typography } from '@mui/material'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'

import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useQuizResult } from '@/v3/presentation/hooks/useQuizResult'
import { useFetchStartQuiz } from '@/v3/presentation/hooks/useFetchStartQuiz'
import { useCheckChoice } from '@/v3/presentation/hooks/useCheckChoice'
import { useFetchQuizQuestionList } from '@/v3/presentation/hooks/useFetchQuizQuestionList'
import { useFetchSaveAnswer } from '@/v3/presentation/hooks/useFetchSaveAnswer'
import { useFetchCourse } from '@/v3/presentation/hooks/useFetchCourse'
import { PageHeader } from '@/v3/presentation/newComponents'

import { PlayerController } from '../../components/PlayerController'
import { QuestionBody } from '../../components/QuestionBody'
import { QuizResult } from '../../components/QuizResult'
import { StartBody } from '../../components/StartBody'
import { StyledWrapperOnlyMobile } from '../modules/styles'

import { StyledOnlyDesktop, StyledQuizContainer, StyledQuizHeader } from './style'

export const ModuleQuiz = () => {
  const router = useRouter()
  const { id, moduleId } = router.query
  const { data: questions } = useFetchQuizQuestionList(Number(moduleId))
  const { saveAnswer } = useFetchSaveAnswer()
  const { data: courseData } = useFetchCourse(Number(id))
  const { startQuiz } = useFetchStartQuiz()
  const { handleCheckChoice } = useCheckChoice()
  const { handleQuizResult } = useQuizResult()
  const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState<any>(null)
  const [quizResult, setQuizResult] = useState<any>(null)
  const [currentView, setCurrentView] = useState<'start' | 'question' | 'result'>('start')
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const handleConfirmAnswer = async (choiceIds: number[]) => {
    saveAnswer(choiceIds)
    setCurrentQuestionAnswer(await handleCheckChoice(choiceIds[0]))
  }
  const nextQuestion = async () => {
    setCurrentQuestionAnswer(null)
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizResult(await handleQuizResult(Number(moduleId)))
      setCurrentView('result')
    }
  }
  return (
    <>
      <PageHeader title={courseData?.title || 'Curso'} />
      <StyledQuizContainer>
        <StyledWrapperOnlyMobile>
          <PlayerController
            menuAction={() =>
              Router.push(
                bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.MODULES.path, {
                  id: String(id),
                })
              )
            }
            style={{ width: 'auto' }}
          />
        </StyledWrapperOnlyMobile>

        <StyledOnlyDesktop>
          <PlayerController
            menuAction={() =>
              Router.push(
                bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.MODULES.path, {
                  id: String(id),
                })
              )
            }
            style={{ margin: '0' }}
          />
        </StyledOnlyDesktop>
        <StyledQuizHeader>
          <h2>{courseData?.module.find((module) => module.id === Number(moduleId))?.name}</h2>
          <h1>Quiz</h1>
        </StyledQuizHeader>
        {currentView === 'start' && (
          <StartBody
            highlightedText='Boa Sorte!'
            onClickStart={() => {
              setCurrentView('question')
              startQuiz(Number(moduleId))
            }}
            bodyText=' Disponibilizamos este quiz para que você possa testar seus conhecimentos e se preparar
        melhor para a avaliação final do curso. Antes de iniciá-lo, leia atentamente as instruções
        abaixo:'
            infoItems={[
              <>
                <Typography>1</Typography>
                <Typography>
                  Este quiz não é obrigatório e nem requisito para a obtenção do certificado
                </Typography>
              </>,
              <>
                <Typography>2</Typography>
                <Typography>As questões são de Verdadeiro ou Falso. </Typography>
              </>,
              <>
                <Typography>3</Typography>
                <Typography>Leia atentamente aos enunciados.</Typography>
              </>,
              <>
                <Typography>4</Typography>
                <Typography>
                  Após confirmar as respostas selecionadas, você terá acesso às respostas corretas
                  de cada questão.
                </Typography>
              </>,
            ]}
          />
        )}
        {currentView === 'question' && (
          <QuestionBody
            question={questions[currentQuestion]}
            nextQuestion={nextQuestion}
            confirmAnswer={(choiceIds: number[]) => handleConfirmAnswer(choiceIds)}
            currentQuestionAnswer={currentQuestionAnswer}
            isQuiz
          />
        )}
        {currentView === 'result' && <QuizResult result={quizResult} />}
      </StyledQuizContainer>
    </>
  )
}
