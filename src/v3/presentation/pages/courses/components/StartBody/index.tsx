import { Button } from '@mui/material'
import { ReactElement } from 'react'

import { CDivider } from '@/v3/presentation/newComponents'
import { useModalContext } from '@/v3/presentation/components/Modal'

import ConfirmationModal from '../ConfirmationModal'

import {
  StyledButtonContainer,
  StyledFooterText,
  StyledHighlightedText,
  StyledQuizBody,
  StyledQuizInfoContainer,
  StyledQuizInfoItem,
} from './style'

interface StartBodyProps {
  bodyText: string
  infoItems: ReactElement[]
  highlightedText: string
  footerText?: string[]
  onClickStart: () => void
  timesUserHasDoneTheTest?: number
  chances?: number
}

export const StartBody: React.FC<StartBodyProps> = ({
  bodyText,
  highlightedText,
  infoItems,
  footerText,
  onClickStart,
  timesUserHasDoneTheTest,
  chances,
}) => {
  const { handleModal } = useModalContext()
  const handleStart = () => {
    if (timesUserHasDoneTheTest === undefined || chances === undefined) {
      return onClickStart()
    }
    const attemptsLeft = chances - timesUserHasDoneTheTest
    const text =
      attemptsLeft > 1
        ? `Quando você começar, será contado como uma tentativa. Você ainda tem mais ${attemptsLeft} chances depois dessa, ok?`
        : `Quando você começar, será contado como uma tentativa. Essa será sua última, ok?
    `

    handleModal(
      <ConfirmationModal onConfirm={onClickStart} text='Deseja iniciar o teste?' subtitle={text} />
    )
  }

  return (
    <>
      <StyledQuizBody>{bodyText}</StyledQuizBody>
      <StyledQuizInfoContainer>
        {infoItems?.map((e) => (
          <StyledQuizInfoItem key={Math.random()}>{e}</StyledQuizInfoItem>
        ))}
      </StyledQuizInfoContainer>
      {footerText?.map((text) => (
        <StyledFooterText key={text}>{text}</StyledFooterText>
      ))}
      <StyledHighlightedText>{highlightedText}</StyledHighlightedText>
      <CDivider />
      <StyledButtonContainer>
        <Button variant='contained' onClick={handleStart}>
          Iniciar
        </Button>
      </StyledButtonContainer>
    </>
  )
}
