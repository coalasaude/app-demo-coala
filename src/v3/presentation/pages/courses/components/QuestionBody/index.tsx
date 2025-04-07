import { Button, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material'
import { useEffect, useState } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

import { CDivider } from '@/v3/presentation/newComponents'
import { Question } from '@/v3/domain/Question'
import { TChoice } from '@/v3/domain/api/ApiCourseResponse'
import { CCheckbox } from '@/v3/presentation/newComponents'

import { StyledButtonContainer } from '../StartBody/style'

import {
  StyledAnswerWrapper,
  StyledQuestionBodyWrapper,
  StyledResponseAnswerContainer,
  StyledResponseAnswerText,
  StyledResponseAnswerTitle,
} from './style'

interface QuestionBodyProps {
  question: Question
  nextQuestion: () => void
  confirmAnswer: (choiceIds: number[]) => void
  currentQuestionAnswer?: any
  isQuiz?: boolean
}

export const QuestionBody: React.FC<QuestionBodyProps> = ({
  question,
  nextQuestion,
  confirmAnswer,
  currentQuestionAnswer,
  isQuiz,
}) => {
  const [value, setValue] = useState<number[] | null>(null)
  const [answer, setAnswer] = useState<TChoice>()
  const handleSetChoiceId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue([Number(event.target.value)])
  }
  const handleSetMultipleChoiceId = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setValue((prevValues) => (prevValues ? [...prevValues, id] : [id]))
    } else {
      setValue((prevValues) => (prevValues ? prevValues.filter((value) => value !== id) : []))
    }
  }

  const renderRadioChoices = () => (
    <StyledAnswerWrapper>
      <FormControl>
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          value={value}
          onChange={handleSetChoiceId}
        >
          {question.choice.map((item) => (
            <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.text} />
          ))}
        </RadioGroup>
      </FormControl>
    </StyledAnswerWrapper>
  )

  const renderMultipleChoice = () => (
    <StyledAnswerWrapper>
      <FormControl>
        <FormGroup>
          {question.choice.map((item) => (
            <FormControlLabel
              key={item.id}
              value={item.id}
              control={
                <CCheckbox
                  onChange={(e) => {
                    handleSetMultipleChoiceId(item.id, e.target.checked)
                  }}
                />
              }
              label={item.text}
              onClick={(e) => {
                e.stopPropagation()
              }}
            />
          ))}
        </FormGroup>
      </FormControl>
    </StyledAnswerWrapper>
  )

  useEffect(() => {
    if (value) {
      setAnswer(question.choice.find((item) => item.id === value[0]))
    }
  }, [question?.choice, value])

  return (
    <StyledQuestionBodyWrapper>
      {question.command}
      {currentQuestionAnswer !== null && isQuiz && (
        <>
          <StyledResponseAnswerContainer
            isCorrect={currentQuestionAnswer?.choice?.id === answer?.id}
          >
            <StyledResponseAnswerTitle>
              {currentQuestionAnswer?.choice?.id === answer?.id ? (
                <CheckCircleOutlineIcon sx={{ color: '#03BE7F' }} />
              ) : (
                <CancelOutlinedIcon sx={{ color: 'var(--mui-palette-error-medium)' }} />
              )}
              {currentQuestionAnswer?.choice?.text}
            </StyledResponseAnswerTitle>
            <StyledResponseAnswerText>Sua resposta foi: {answer?.text}</StyledResponseAnswerText>
            <StyledResponseAnswerText>{currentQuestionAnswer?.text}</StyledResponseAnswerText>
          </StyledResponseAnswerContainer>
          <CDivider />
        </>
      )}
      {currentQuestionAnswer === null && !question.multipleChoice && renderRadioChoices()}
      {currentQuestionAnswer === null && question.multipleChoice && renderMultipleChoice()}
      <CDivider />
      <StyledButtonContainer>
        {currentQuestionAnswer === null ? (
          <>
            <Button
              variant='contained'
              onClick={() => {
                if (value?.length) {
                  confirmAnswer(value)
                  if (!isQuiz) {
                    setValue(null)
                    nextQuestion()
                  }
                }
              }}
            >
              Confirmar Resposta
            </Button>
            <Button
              variant='outlined'
              onClick={() => {
                setValue(null)
                nextQuestion()
              }}
            >
              Pular questão
            </Button>
          </>
        ) : (
          <Button
            variant='contained'
            onClick={() => {
              setValue(null)
              nextQuestion()
            }}
          >
            Proxima questão
          </Button>
        )}
      </StyledButtonContainer>
    </StyledQuestionBodyWrapper>
  )
}
