import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import React from 'react'

import { SquareButton } from '../SquareButton'

import {
  StyledDiagnoseCard,
  StyledDiagnoseCardContentContainer,
  StyledDiagnoseCardContentLabel,
  StyledDiagnoseCardContentText,
  StyledDiagnoseCardContentWrapper,
  StyledDiagnoseCardHeader,
  StyledDiagnoseCardHeaderActions,
  StyledDiagnoseCardHeaderLabel,
  StyledDiagnoseCardHeaderStatus,
  StyledDiagnoseCardHeaderStatusContainer,
  StyledDiagnoseCardHeaderTitle,
  StyledDiagnoseCardHeaderTitleContainer,
} from './styles'

export interface IDiagnoseCardProps {
  title: string
  isInvalid?: boolean
  professional: string
  date: string
  onClick?: () => void
}

export const DiagnoseCard: React.FC<IDiagnoseCardProps> = ({
  title,
  isInvalid,
  professional,
  date,
  onClick,
}) => {
  const headerContent = isInvalid ? (
    <StyledDiagnoseCardHeaderStatusContainer>
      <StyledDiagnoseCardHeaderStatus>
        Invalidado
        <ErrorOutlineIcon />
      </StyledDiagnoseCardHeaderStatus>
    </StyledDiagnoseCardHeaderStatusContainer>
  ) : (
    <StyledDiagnoseCardHeaderActions>
      <SquareButton onClick={onClick}>
        <ArrowForwardIosIcon />
      </SquareButton>
    </StyledDiagnoseCardHeaderActions>
  )

  return (
    <StyledDiagnoseCard>
      <StyledDiagnoseCardHeader>
        <StyledDiagnoseCardHeaderTitleContainer>
          <StyledDiagnoseCardHeaderLabel>Diagnóstico</StyledDiagnoseCardHeaderLabel>
          <StyledDiagnoseCardHeaderTitle>{title}</StyledDiagnoseCardHeaderTitle>
        </StyledDiagnoseCardHeaderTitleContainer>

        {headerContent}
      </StyledDiagnoseCardHeader>

      <StyledDiagnoseCardContentWrapper>
        <StyledDiagnoseCardContentContainer>
          <StyledDiagnoseCardContentLabel>Profissional</StyledDiagnoseCardContentLabel>
          <StyledDiagnoseCardContentText>{professional}</StyledDiagnoseCardContentText>
        </StyledDiagnoseCardContentContainer>

        <StyledDiagnoseCardContentContainer>
          <StyledDiagnoseCardContentLabel>Data</StyledDiagnoseCardContentLabel>
          <StyledDiagnoseCardContentText>{date}</StyledDiagnoseCardContentText>
        </StyledDiagnoseCardContentContainer>
      </StyledDiagnoseCardContentWrapper>
    </StyledDiagnoseCard>
  )
}
