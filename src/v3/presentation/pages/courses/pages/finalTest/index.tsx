import { Typography } from '@mui/material'
import Router from 'next/router'
import { useEffect, useState } from 'react'

import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useFetchStartTest } from '@/v3/presentation/hooks/useFetchStartTest'
import { useFetchTestQuestionList } from '@/v3/presentation/hooks/useFetchTestQuestionList'
import { useFetchSaveAnswer } from '@/v3/presentation/hooks/useFetchSaveAnswer'
import { useCheckChoice } from '@/v3/presentation/hooks/useCheckChoice'
import { useTestResult } from '@/v3/presentation/hooks/useTestResult'
import { useFetchCourse } from '@/v3/presentation/hooks/useFetchCourse'
import { PageHeader } from '@/v3/presentation/newComponents'

import { PlayerController } from '../../components/PlayerController'
import { QuestionBody } from '../../components/QuestionBody'
import { FinalTestResult } from '../../components/FinalTestResult'
import { StartBody } from '../../components/StartBody'
import { StyledWrapperOnlyMobile } from '../modules/styles'
import { StyledOnlyDesktop, StyledQuizContainer } from '../quiz/style'
import { SendTest } from '../../components/SendTest'

import {
  StyledAccessTimeIcon,
  StyledFinalTestHeader,
  StyledWrapperTimer,
  StyledWrapperTitles,
} from './style'
export const FinalTest = () => {
  const { id } = Router.query
  const [currentView, setCurrentView] = useState<'start' | 'question' | 'send' | 'result'>('start')
  const { endTest, startTest } = useFetchStartTest()
  const [timer, setTimer] = useState<number | null>(null)

  const { data: questionsData } = useFetchTestQuestionList(Number(id))
  const { data: course } = useFetchCourse(Number(id))
  const { saveAnswer } = useFetchSaveAnswer()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState<any>(null)
  const [intervalId, setIntervalId] = useState<number | null>(null)
  const { handleCheckChoice } = useCheckChoice()
  const [testResult, setTestResult] = useState<{
    approval: boolean
    canRetry: boolean
    result: number
  } | null>(null)
  const { handleTestResult } = useTestResult()

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }

  const handleConfirmAnswer = async (choiceIds: number[]) => {
    saveAnswer(choiceIds)
    setCurrentQuestionAnswer(await handleCheckChoice(choiceIds[0]))
    setCurrentQuestionAnswer(null)
  }
  const nextQuestion = async () => {
    if (currentQuestion + 1 < questionsData.questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      endTest(Number(id))
      setCurrentView('send')
      stopTimer()
    }
  }

  const displayTime = () => {
    if (timer !== null) {
      const minutes = Math.floor(timer / 60)
      const seconds = timer % 60
      return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }
    return '00:00'
  }

  useEffect(() => {
    if (timer === 0 && currentView === 'question') {
      endTest(Number(id))
      setCurrentView('send')
    } else if (timer !== null && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => (prevTime ? prevTime - 1 : 0))
      }, 1000) as unknown as number

      setIntervalId(interval)

      return () => clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer])

  useEffect(() => {
    async function fetchData() {
      const result = await handleTestResult(Number(id))
      if (result.canRetry) {
        setCurrentView('start')
      } else {
        setCurrentView('result')
        setTestResult(result)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PageHeader title={course?.title || 'Curso'} />
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
        <StyledFinalTestHeader>
          <StyledWrapperTitles>
            {currentView === 'start' && (
              <>
                <h2>Avaliação Final</h2>
                <h1>Parabéns!</h1>
              </>
            )}
          </StyledWrapperTitles>
          <StyledWrapperTimer>
            {timer !== null ? displayTime() : questionsData.maximumTime / 60}min
            <StyledAccessTimeIcon />
          </StyledWrapperTimer>
        </StyledFinalTestHeader>
        {currentView === 'start' && (
          <StartBody
            timesUserHasDoneTheTest={course?.timesUserHasDoneTheTest || 0}
            chances={course?.chance || 0}
            highlightedText='Boa sorte na avaliação!'
            bodyText=' Você concluiu o curso e agora está na hora de avaliar todo o conhecimento adquirido. Seguem algumas orientações para te auxiliar:'
            onClickStart={() => {
              setCurrentView('question')
              startTest(Number(id))
              setTimer(questionsData.maximumTime)
            }}
            infoItems={[
              <>
                <Typography>1</Typography>
                <Typography>
                  A avaliação é uma etapa obrigatória para que você obtenha o certificado;
                </Typography>
              </>,
              <>
                <Typography>2</Typography>
                <Typography>As questões são de múltipla escolha;</Typography>
              </>,
              <>
                <Typography>3</Typography>
                <Typography>
                  Você poderá pular as questões, porém, para que a avaliação seja finalizada, todas
                  as questões devem ser respondidas;
                </Typography>
              </>,
              <>
                <Typography>4</Typography>
                <Typography>
                  Para obter o certificado você precisa acertar, pelo menos,{' '}
                  {course?.approval && course?.qtdQuestions
                    ? Math.ceil((course?.approval / course?.qtdQuestions) * 100)
                    : '70'}
                  % da avaliação;
                </Typography>
              </>,
            ]}
            footerText={[
              'Leia atentamente os enunciados e fique atento ao tempo. Antes de concluir a avaliação, será possível revisar as questões assinaladas.',
              'Caso você não seja aprovado, uma nova tentativa será permitida.',
            ]}
          />
        )}
        {currentView === 'question' && (
          <QuestionBody
            question={questionsData.questions[currentQuestion]}
            nextQuestion={nextQuestion}
            confirmAnswer={(choiceIds: number[]) => handleConfirmAnswer(choiceIds)}
            currentQuestionAnswer={currentQuestionAnswer}
            isQuiz={false}
          />
        )}
        {currentView === 'send' && (
          <SendTest
            handleClick={async () => {
              setTestResult(await handleTestResult(Number(id)))
              setCurrentView('result')
            }}
          />
        )}
        {currentView === 'result' && (
          <FinalTestResult
            approval={testResult?.approval || false}
            scorePercentage={(testResult?.result || 0) * 100}
            canRetry={testResult?.canRetry || false}
            hasBenefits={!!course?.benefits || false}
          />
        )}
      </StyledQuizContainer>
    </>
  )
}
