import { SaveAlt } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

import { DefaultStatus } from '@/types/status'
import { CButton } from '@/v3/presentation/newComponents'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'
import { CButtonGroup } from '@/v3/presentation/newComponents/molecules/CButtonGroup'

import { RecordProps } from '../../types/TRecords'
import { Professional } from '../Professional'
import { RecordContentSkeleton } from '../RecordContentSkeleton'
import ButtonWrapperVideoCall from '../../../../../call/components/ButtonWrapperVideoCall'

import { RecordContentWrapper } from './components/RecordContentWrapper'
import { StyledButtonsContainer, StyledContainer } from './styles'

interface RecordContentProps {
  title: string
  record?: RecordProps
  children: React.ReactNode
  canManage?: boolean
  viewOverlay?: boolean
  allowDownload?: boolean
  showCreator?: boolean
  onInvalidate: () => void
  onClose: () => void
  onRegenerate?: () => void
}

export const RecordContent = ({
  children,
  onClose,
  onInvalidate,
  canManage,
  allowDownload = true,
  title,
  record,
  viewOverlay,
  onRegenerate,
  showCreator = true,
}: RecordContentProps) => {
  const handleDownload = () => {
    if (record?.document?.url) {
      downloadByProxy({ url: record.document.url })
    }
  }

  const buttonArray = [
    allowDownload && (
      <CButton loading={!record?.document} onClick={handleDownload} key={1}>
        <Stack direction='row' gap={1}>
          Baixar
          <SaveAlt sx={{ fontSize: 20 }} />
        </Stack>
      </CButton>
    ),
    canManage && (
      <CButton key={0} onClick={onInvalidate}>
        Invalidar
      </CButton>
    ),
    onRegenerate && (
      <CButton key={2} onClick={onRegenerate}>
        Regenerar
      </CButton>
    ),
  ].filter(Boolean)

  const isActive = record?.status === DefaultStatus.ACTIVE

  return (
    <RecordContentWrapper title={title} onClose={onClose} viewOverlay={viewOverlay}>
      <StyledContainer isActive={isActive} isResumeVideoLog={viewOverlay}>
        {!record ? (
          <RecordContentSkeleton />
        ) : (
          <>
            <Stack direction='row' justifyContent='space-between'>
              {!viewOverlay && <Typography variant='h4'>{title}</Typography>}

              {isActive && !onRegenerate && (
                <ButtonWrapperVideoCall>
                  <StyledButtonsContainer>
                    {canManage && (
                      <CButton variant='secondary' onClick={onInvalidate} fullWidth>
                        Invalidar
                      </CButton>
                    )}
                    {allowDownload && (
                      <CButton
                        loading={!record.document}
                        variant='primary'
                        onClick={handleDownload}
                        fullWidth
                      >
                        <Stack direction='row' gap={0.5}>
                          Baixar
                          <SaveAlt sx={{ fontSize: 20 }} />
                        </Stack>
                      </CButton>
                    )}
                  </StyledButtonsContainer>
                </ButtonWrapperVideoCall>
              )}
              {onRegenerate && (
                <CButtonGroup
                  primary='split'
                  orientation='horizontal'
                  size='medium'
                  variant='primary'
                  data-testid='SaveAltIcon'
                >
                  {buttonArray as JSX.Element[]}
                </CButtonGroup>
              )}
            </Stack>

            {showCreator && record?.professional && (
              <Professional
                isActive={isActive}
                data={{
                  fullName: `${record?.professional?.name} ${record?.professional?.lastName}`,
                  cpf: record?.professional?.cpf,
                  email: record?.professional?.email,
                  registration: record.professional.registrationNumber,
                  isNurse: record.professional.isNurse,
                }}
              />
            )}

            {children}
          </>
        )}
      </StyledContainer>
    </RecordContentWrapper>
  )
}
