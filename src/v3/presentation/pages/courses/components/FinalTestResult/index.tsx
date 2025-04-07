import { Button, Typography } from '@mui/material'
import Router from 'next/router'
import { useEffect } from 'react'

import { useMutateCourse } from '@/v3/presentation/hooks/useMutateCourse'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'
import { useLayout } from '@/hooks/useLayout'
import { CDivider } from '@/v3/presentation/newComponents'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'

import { StyledFinalTestHeader, StyledWrapperTitles } from '../../pages/finalTest/style'
import {
  StyledQuizResultContainer,
  StyledQuizScore,
  StyledQuizScoreContainer,
  StyledQuizScoreText,
  StyledQuizScoreValueContainer,
} from '../QuizResult/style'
import { StyledButtonContainer } from '../StartBody/style'

export const FinalTestResult = ({
  scorePercentage,
  approval,
  canRetry,
  hasBenefits,
}: {
  scorePercentage: number
  approval: boolean
  canRetry: boolean
  hasBenefits?: boolean
}) => {
  const { id } = Router.query
  const { createCertificate, certificateUrl, resetCourseUser } = useMutateCourse()
  const { showSnackBar } = useLayout()

  useEffect(() => {
    if (certificateUrl) {
      downloadByProxy({ url: certificateUrl })
    }
  }, [certificateUrl])

  const handleResetCourse = () => {
    resetCourseUser(Number(id))
    Router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.MODULES.path, {
        id: String(Router.query.id),
      })
    )
  }

  return (
    <>
      <StyledFinalTestHeader>
        <StyledWrapperTitles>
          <h2>Avaliação Final</h2>
          <h1>{approval ? 'Parabéns!' : 'Que Pena!'}</h1>
        </StyledWrapperTitles>
      </StyledFinalTestHeader>
      <StyledQuizResultContainer>
        {approval && (
          <Typography sx={{ marginLeft: '16px', marginBottom: '8px' }}>
            Estamos muito felizes em ver que você se dedicou ao curso e alcançou este importante
            objetivo. Seu esforço e dedicação foram fundamentais para o seu sucesso.
          </Typography>
        )}{' '}
        {!approval && canRetry && (
          <Typography sx={{ marginLeft: '16px', marginBottom: '8px' }}>
            Você não atingiu a pontuação necessária. Realize a avaliação novamente e obtenha o seu
            certificado.
          </Typography>
        )}
        {!approval && !canRetry && (
          <Typography sx={{ marginLeft: '16px', marginBottom: '8px' }}>
            Parece que você ainda não atingiu a pontuação necessária e suas tentativas se esgotaram.
            Para obter o certificado, é preciso ter um percentual maior de acertos. Mas não se
            preocupe! Você pode reiniciar o curso e tentar a avaliação novamente. Estamos aqui para
            apoiar você nessa jornada!
          </Typography>
        )}
        <StyledQuizScoreContainer>
          <StyledQuizScore>
            <StyledQuizScoreValueContainer isErros={!approval}>
              {scorePercentage?.toFixed(0)}%
            </StyledQuizScoreValueContainer>
            <StyledQuizScoreText>Respostas certas</StyledQuizScoreText>
          </StyledQuizScore>
        </StyledQuizScoreContainer>
        <CDivider />
        <StyledButtonContainer>
          {approval && hasBenefits && (
            <Button
              variant='contained'
              onClick={() => {
                showSnackBar({
                  message: 'Certificado sendo gerado, aguarde um momento',
                  type: 'info',
                })
                createCertificate(Number(id))
              }}
            >
              Baixar certificado
            </Button>
          )}
          {canRetry && !approval && (
            <Button variant='contained' onClick={() => Router.reload()}>
              Tentar Novamente
            </Button>
          )}
          {!canRetry && !approval && (
            <Button variant='contained' onClick={() => handleResetCourse()}>
              Reiniciar Curso
            </Button>
          )}
        </StyledButtonContainer>
      </StyledQuizResultContainer>
    </>
  )
}
