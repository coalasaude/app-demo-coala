import DownloadIcon from '@mui/icons-material/Download'
import EventNoteIcon from '@mui/icons-material/EventNote'
import { Box } from '@mui/material'
import Router from 'next/router'
import { useEffect } from 'react'

import { WebViewManager } from '@/services/WebView'
import { CDivider, PageHeader } from '@/v3/presentation/newComponents'

import { useFetchMentalHealth } from '../../../../hooks/useFetchMentalHealth'
import { convertToBrDate } from '../../../../utils/date'
import { StatusHeader } from '../../components/StatusHeader'
import { StyledSessionPageWrapper } from '../../styles'

import {
  StyleDownloadButtonWrapper,
  StyledRecordDateInfoContainer,
  StyledRecordInfo,
  StyledRecordInfoContainer,
  StyledRecordInfoFormWrapper,
  StyledRecordWrapper,
  StyledWrapperFooterButtons
} from './styles'

export const Record = () => {
  const {
    schedule: session,
    getMentalHealthSession,
    record,
    getMentalHealthRecord,
  } = useFetchMentalHealth()
  const { id, recordId } = Router.query
  useEffect(() => {
    getMentalHealthSession(Number(id))
    getMentalHealthRecord(Number(recordId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      {record && session && (
        <>
          <PageHeader title='Registro' />
          <StyledSessionPageWrapper>
            <StyledRecordWrapper>
              <StatusHeader status={session.status} />
              <StyledRecordInfoContainer>
                <h1>Detalhes do registro</h1>
                <StyledRecordDateInfoContainer>
                  <EventNoteIcon />
                  {convertToBrDate(record.createdAt)}
                </StyledRecordDateInfoContainer>
                <StyledRecordInfoFormWrapper>
                  <StyledRecordInfo>
                    <span className='subTitle'>Aluno</span>
                    <span>{session?.appointment?.patient?.getFormattedName()}</span>
                    <CDivider />
                  </StyledRecordInfo>
                  <Box sx={{ display: 'flex', gap: '16px' }}>
                    <StyledRecordInfo>
                      <span className='subTitle'>Idade</span>
                      <span>
                        {session?.appointment?.patient?.birthday
                          ? session?.appointment?.patient?.getAge() + ' anos'
                          : '-'}
                      </span>
                      <CDivider />
                    </StyledRecordInfo>
                    <StyledRecordInfo>
                      <span className='subTitle'>Sexo</span>
                      <span>{session?.appointment?.patient?.genre || '-'}</span>
                      <CDivider />
                    </StyledRecordInfo>
                  </Box>
                  <StyledRecordInfo>
                    <span className='subTitle'>Profissional</span>
                    <span>{session?.professional?.getFormattedName()}</span>
                    <CDivider />
                  </StyledRecordInfo>
                  <StyledRecordInfo>
                    <span className='subTitle'>Descrição do registro</span>
                    <span>{record.description}</span>
                    <CDivider />
                  </StyledRecordInfo>
                </StyledRecordInfoFormWrapper>
                <StyledWrapperFooterButtons>
                  <StyleDownloadButtonWrapper onClick={() => WebViewManager.open(record?.url)}>
                    <DownloadIcon sx={{ color: '#6F46BE' }} />
                    Baixar Arquivo
                  </StyleDownloadButtonWrapper>
                </StyledWrapperFooterButtons>
              </StyledRecordInfoContainer>
            </StyledRecordWrapper>
          </StyledSessionPageWrapper>
        </>
      )}
    </>
  )
}
