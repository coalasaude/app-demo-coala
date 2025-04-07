import { Box, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import HistoryIcon from '@mui/icons-material/History'
import { usePostHog } from 'posthog-js/react'

import { CAvatar, CTooltip, PageHeader } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'

// import { assistantsList } from '../../constants/assistantsList'
import { Assistant } from '../../types/Assistant'
import ChatForm from '../../components/ChatForm/ChatForm'

export default function AiChatPage() {
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const router = useRouter()
  const assistantId = router.query.assistantId
  const [assistant] = useState<Assistant>()
  const isMobile = useMediaQuery('sm')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    // disabling use until validation occurs
    // const assistant = assistantsList.find((e) => e.id === assistantId)
    //setAssistant(() => assistant)

    return () => {
      posthog.capture('viewed_ai_assistant_chat', {
        assistantId: assistantId,
        name: assistant?.name,
        time_spent: getCount(),
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assistantId, getCount, posthog])

  return (
    <>
      <Box display={'flex'} flexDirection={'column'}>
        <PageHeader
          title={isMobile ? assistant?.name || 'Assistente de IA' : 'Assistente de IA'}
          onBack={() => {
            router.push('/app/ia')
          }}
          sx={{
            display: 'flex',
          }}
          secondaryButtonProps={
            isMobile
              ? {
                  children: <HistoryIcon />,
                  notUsePortal: true,
                  variant: 'text',
                  onClick: () => {
                    setIsDrawerOpen(!isDrawerOpen)
                  },
                  size: 'medium',
                  sx: {
                    border: '1px solid var(--mui-palette-grey-300)',
                    color: 'var(--mui-palette-grey-600)',
                    width: 38,
                    minWidth: 38,
                    borderRadius: '4px',
                  },
                }
              : undefined
          }
        >
          {isMobile && (
            <CTooltip description={assistant?.description}>
              <Box
                display='flex'
                alignItems='center'
                gap={1}
                color={'var(--mui-palette-grey-500)'}
                ml={1}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <InfoIcon sx={{ width: '18px', height: '18px' }} />
              </Box>
            </CTooltip>
          )}
        </PageHeader>
        {!isMobile && (
          <Box mt={3} mb={2} display='flex' alignItems='center' gap={2}>
            <CAvatar type='icon' size='large' SvgIcon={assistant?.icon} />
            <Typography variant='h3'>{assistant?.name}</Typography>
            {!isMobile && (
              <CTooltip description={assistant?.description}>
                <Box
                  display='flex'
                  alignItems='center'
                  gap={1}
                  color={'var(--mui-palette-grey-500)'}
                  ml={1}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <InfoIcon sx={{ width: '18px', height: '18px' }} />
                  <Typography
                    variant='h4'
                    sx={{ textDecoration: 'underline' }}
                    color={'var(--mui-palette-grey-500)'}
                  >
                    Sobre
                  </Typography>
                </Box>
              </CTooltip>
            )}
          </Box>
        )}
        <Divider sx={isMobile ? { marginTop: 1 } : null} />
        <Box height={'70vh'}>
          <ChatForm isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        </Box>
      </Box>
    </>
  )
}
